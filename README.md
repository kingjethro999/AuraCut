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
### Running with Docker

1. **Build the image:**
   ```bash
   docker build -t auracut .
   ```

2. **Run the container:**
   ```bash
   docker run -p 3000:3000 --env-file .env auracut
   ```

Open your browser and navigate to `http://localhost:3000`.

## 📖 API Documentation

AuraCut provides a high-performance REST API for background removal.

### `POST /remove-bg`

Process an image to remove its background using the advanced `birefnet-general` model.

**Headers:**
- `api-key`: (Optional) Your AuraCut API key.
- `Content-Type`: `multipart/form-data`

**Request Body:**
- `file`: The image file to process (Required).

**Response:**
- `200 OK`: Returns the processed PNG image as a stream.
- `400 Bad Request`: If the uploaded file is not an image.
- `403 Forbidden`: If API key validation is enabled and the key is invalid.
- `500 Internal Server Error`: For processing errors.

## 💻 Usage Examples

### Using `curl`

```bash
curl -X POST "http://localhost:3000/remove-bg" \
     -F "file=@/path/to/your/image.jpg" \
     --output processed_image.png
```

### Using Python (`requests`)

```python
import requests

url = "http://localhost:3000/remove-bg"
files = {'file': open('image.jpg', 'rb')}
# headers = {'api-key': 'your_api_key'} # Uncomment if using API keys

response = requests.post(url, files=files)

if response.status_code == 200:
    with open('output.png', 'wb') as f:
        f.write(response.content)
    print("Background removed successfully!")
else:
    print(f"Error: {response.status_code} - {response.text}")
```

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
