# Email Filtering System using Neural Networks and Large Language Models

**Author:** Sorin-Ioan-Alexandru Bîrchi  
**Faculty:** Automation and Computers, University POLITEHNICA of Bucharest  
**Year:** 3rd Year, Group 332AB  
**Scientific Coordinator:** Assoc. Prof. Dr. Eng. Ștefan Mocanu  
**Event:** Student Scientific Communications Session – 2025

---

## 📌 Overview

This project presents a scalable AI-powered email filtering system designed to detect and remove disturbing or offensive content—whether it is present in the text, audio, image, or video attachments of emails. It leverages the capabilities of **Large Language Models (LLMs)** and **Convolutional Neural Networks (CNNs)** in a **SaaS (Software-as-a-Service)** architecture.

---

## 🔍 Motivation

As digital communication becomes omnipresent, so do the risks of receiving offensive, harmful, or disturbing content. Standard keyword-based filters often fall short. The goal of this project is to build a smarter, context-aware filtering system using advanced AI techniques that understand not only explicit threats but also implied or nuanced ones.

---

## 🎯 Objectives

- Develop a scalable and generalizable email filtering tool.
- Filter offensive content from:
  - **Email text** using fine-tuned LLMs.
  - **Audio files** using speech-to-text (Whisper) and LLM classification.
  - **Images** using CNN-based classifiers.
  - **Videos** by combining frame-level CNN classification and Whisper-based audio transcription.
- Provide a user-friendly web interface to manage filtering.

---

## 🧠 Technologies and Tools

### AI Models and Libraries

- **Phi-4 (Microsoft)** – LLM for text classification.
- **Whisper (OpenAI)** – Speech-to-text for audio classification.
- **CNN (custom-trained with PyTorch/Keras)** – For image classification.
- **LLaMA 3** – Attempted fine-tuning with Unsloth.
- **ro-offense Dataset** – Romanian offensive language dataset.

### Backend

- **Python**, **Flask**, **IMAPLIB** – Mail server interaction and model execution.
- **MongoDB** – User data storage.

### Frontend

- **React**, **Tailwind CSS**, **Vite** – Web interface.
- **Nginx** – Reverse proxy to connect frontend and backend.

### Infrastructure

- **Docker** – Containerization of services.
- **Kubernetes** – Container orchestration (for future scalability).

---

## 🧱 Architecture

- Web app with sign-up, login, and dashboard to activate/deactivate filters.
- Filters are applied to GMX email accounts using IMAP.
- Two servers run in parallel: frontend (React/Vite) and backend (Flask).
- Nginx acts as a reverse proxy between frontend and backend.

---

## 🛠️ Functionality

1. **User registers** using email, account password, and an app-specific password.
2. Once activated, the system checks all incoming emails in real time.
3. The filtering pipeline:
   - Analyze **email text** → If flagged → delete.
   - If not flagged, analyze **audio attachments** → Whisper + LLM → delete if flagged.
   - Then analyze **images** → CNN → delete if flagged.
   - Finally analyze **videos** → extract 1 frame/sec + audio → CNN + LLM → delete if flagged.
4. If the email passes all filters, it is left intact.

---

## ⚠️ Limitations

- Classification speed is limited by hardware.
- False positives can occur, especially with poorly written text or regional language.
- Only GMX email accounts are supported at the moment.
- Limited by dataset size and language complexity (Romanian).

---

## 🧩 Future Improvements

- Build and fine-tune a Romanian-specific LLM.
- Expand Romanian datasets with slang, regionalisms, and historical terms.
- Use ViT (Vision Transformer) instead of CNNs for image classification.
- Extract more frames per second from videos for better accuracy.

---

## 📚 References

1. [PurgoMalum – Profanity Filter](https://www.purgomalum.com/)
2. [3Blue1Brown – AI Educational Content](https://www.3blue1brown.com/)
3. [Unsloth – Fast LLM Fine-tuning](https://docs.unsloth.ai/)
4. [ro-offense Dataset](https://huggingface.co/datasets/readerbench/ro-offense)
5. [Phi-4 – Technical Report](https://www.microsoft.com/en-us/research/wp-content/uploads/2024/12/P4TechReport.pdf)
6. [OpenAI Whisper](https://github.com/openai/whisper)
7. [UCF Crime Dataset (Kaggle)](https://www.kaggle.com/datasets/odins0n/ucf-crime-dataset)
8. [Andrew Ng – Machine Learning Specialization](https://www.coursera.org/specializations/machine-learning-introduction)

---


In order to install all the dependencies we should run the following commands:
```
sudo apt update && upgrade
sudo apt install npm nginx
conda env update -n my_env --file requirements.yaml
```

After installing the dependencies the components should be in a running phase:
```
cd frontend
sudo npm run dev
cd ../backend
python3 server.py
cd ..
sudo nginx -c "$(pwd)/default.conf"
sudo docker build -f docker_files/ollama_phi4.dockerfile -t ollama-phi4 .

```

The database should run on port `27017` and have respect the following structure:
```
{"name" : name,
"password" : password,
"email" : email,
"app_pass" : app_pass,}
```
