# Use Ollama's official image
FROM ollama/ollama:latest

# Pull phi3/phi4 model during build (optional)
# RUN ollama pull phi4  # Replace with phi4 if available and supported

# Expose the Ollama API port
EXPOSE 11434

# Start Ollama service

CMD ["ollama", "serve"]
