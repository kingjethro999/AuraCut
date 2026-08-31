# AuraCut ✂️

**Precision Background Removal at Your Fingertips.**

AuraCut is a proprietary, high-end SaaS tool designed for professionals who need fast, clean, and reliable background removal. Built with an API-first philosophy, it combines a powerful Python backend with a sleek, vibrant web interface.

![AuraCut Favicon](auracut.png)

## ✨ Features

- **AI-Powered Precision**: Powered by the `rembg` engine for studio-quality cuts.
- **Sleek UI/UX**: Premium dark-mode design with glassmorphism and smooth animations.
- **Appwrite Integration**: Secure GitHub Authentication and API key management.
- **Fast & Lightweight**: Built with FastAPI for high-performance image processing.
- **API-First**: Designed to be integrated into your own applications.

## 🚀 Getting Started

### Prerequisites

- Python 3.10+
- Linux environment (tested on Ubuntu/Debian)

### Setup & Installation

1. **Set up the virtual environment:**
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

2. **Install dependencies:**
   ```bash
   pip install --upgrade pip
   pip install fastapi uvicorn rembg[cpu] appwrite python-dotenv pillow python-multipart
   ```

3. **Configuration:**
   Create a `.env` file in the root directory and add your Appwrite credentials:
   ```env
   APPWRITE_PROJECT_ID="your_project_id"
   APPWRITE_ENDPOINT="your_endpoint"
   APPWRITE_API_KEY_SECRET="your_secret"
   APPWRITE_DB_NAME="auracut"
   ```

### Running the App

Start the FastAPI server:
```bash
./venv/bin/python main.py
```
Open your browser and navigate to `http://localhost:3000`.

## 🛠️ Tech Stack

- **Backend**: Python (FastAPI, Rembg)
- **Frontend**: HTML5, CSS3 (Vanilla), JavaScript (ES6)
- **Auth & Database**: Appwrite
- **Hosting**: Render.com (Plan)

## 👤 Author

Developed by **King Jethro**.

- **Portfolio**: [jethroportfolio.vercel.app](https://jethroportfolio.vercel.app)
- **GitHub**: [@kingjethro999](https://github.com/kingjethro999)

## 📄 License

Copyright (c) 2026 King Jethro. All Rights Reserved. Proprietary software. Unauthorized copying, modification, or distribution is prohibited.

---

*Made with ❤️ for the creative community.*
