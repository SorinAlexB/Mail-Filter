import requests
import os

def chat_ollama(text, model="phi4", host="http://localhost:11434"):
    url = f"{host}/api/generate"
    prompt = """
    You are a classifier for profanity on ROMANIAN texts. You should output one of the following labels(just one word) based on the text that will be provided. The labels are: other, insult, abuse, profanity
    Don't provide Notes!
    The text you should calssify is {text} 
    """
    payload = {
        "model": model,
        "prompt": prompt.format(text=text),
        "stream": False
    }
    response = requests.post(url, json=payload)
    response.raise_for_status()
    return response.json()["response"]

def check_profanity(text) -> bool:
    label = chat_ollama(text)
    print(label)
    if( "profanity" in label or "insult" in label or "abuse" in label or "Profanity" in label or "Insult" in label or "Abuse" in label):
        return True
    return False

