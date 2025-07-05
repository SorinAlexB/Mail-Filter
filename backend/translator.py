import whisper

def translate(audio_file)->str:
    model = whisper.load_model("turbo", device="cpu")
    audio_path = audio_file
    result = model.transcribe(audio_path, language="ro")
    return result["text"]
