import imaplib
import email
from email.header import decode_header
import os
import shutil

IMAP_SERVER = "imap.gmx.com"
IMAP_PORT = 993

"""
Connects to IMAP server using user's credentials

Returns -> new IMAP4_SSL object
"""
def connection() -> imaplib.IMAP4_SSL:
    try:
        mail = imaplib.IMAP4_SSL(IMAP_SERVER, IMAP_PORT)
        mail.login(EMAIL_ACCOUNT, PASSWORD)
        mail.select("inbox")
        return mail
    except imaplib.IMAP4.error as e:
        print("IMAP Error:", str(e))
        exit(1)
    except Exception as e:
        print("Unexpected error:", str(e))
        exit(1)

"""
Iterate through mailbox and check every mail
"""
def process_mails(mail) -> None:
    status, messages = mail.search(None, "ALL")
    if status == 'OK':
        emails_ids = messages[0].split()
        for id in emails_ids:
            status, msg_data = mail.fetch(id, "(RFC822)")
            if status == 'OK':
                parse_and_verify(msg_data, id)
            else:
                print("Status Error: ",status)
                exit(1)
    else:
        print("Status Error: ",status)
        exit(1)

"""
Delete the mail which has the position id in the mailbox
"""
def delete_mail(id) -> None:
    mail.store(id, '+FLAGS', '\\Deleted')
    mail.expunge()
    print(f"Email with ID {id.decode()} has been deleted!")

"""
Parse a specific mail in order to verify it's content and
also it's attachments
"""
def parse_and_verify(msg_data, id) -> None:
    ATTACHMENTS_DIR = f"attachments/mail{id.decode()}"
    os.makedirs(ATTACHMENTS_DIR, exist_ok=True)

    for response_part in msg_data:
        if isinstance(response_part, tuple):
            msg = email.message_from_bytes(response_part[1])

            # Decode the email subject
            subject, encoding = decode_header(msg["Subject"])[0]
            if isinstance(subject, bytes):
                subject = subject.decode(encoding if encoding else "utf-8")

            # Decode the sender's email address
            from_ = msg.get("From")

            print(f"Subject: {subject}")
            print(f"From: {from_}")
            print("=" * 50)

            has_attachments = False

            if msg.is_multipart():
                for part in msg.walk():
                    content_type = part.get_content_type()
                    content_disposition = str(part.get("Content-Disposition"))

                    # Check if the part is an attachment
                    if "attachment" in content_disposition:
                        has_attachments = True
                        filename = part.get_filename()
                        if filename:
                            filename, encoding = decode_header(filename)[0]
                            if isinstance(filename, bytes):
                                filename = filename.decode(encoding if encoding else "utf-8")
                            filepath = os.path.join(ATTACHMENTS_DIR, filename)

                            # Save the attachment
                            with open(filepath, "wb") as f:
                                f.write(part.get_payload(decode=True))
                            print(f"Downloaded attachment: {filename}")

                    # Extract plain text content
                    elif content_type == "text/plain" and "attachment" not in content_disposition:
                        body = part.get_payload(decode=True).decode()
                        print("Text Body:")
                        print(body)
            else:
                if msg.get_content_type() == "text/plain":
                    body = msg.get_payload(decode=True).decode()
                    print("Body:")
                    print(body)

            if has_attachments:
                print("This email contains attachments.")
            else:
                print("No attachments found.")

"""
Log out from mail and delete all residual data, i.e. delete
all saved attachment from system
"""
def log_out(mail) -> None:
    mail.logout()
    shutil.rmtree("attachments")
    print("Disconnecting...")

if __name__ == '__main__':
    EMAIL_ACCOUNT = input("Email accout: ")
    PASSWORD = input("App Password: ")
    mail = connection()
    process_mails(mail)
    log_out(mail)
