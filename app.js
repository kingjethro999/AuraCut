// Appwrite Configuration (from .env values passed manually or fetched via endpoint)
const client = new Appwrite.Client();
const account = new Appwrite.Account(client);
const databases = new Appwrite.Databases(client);

// These should ideally be fetched from the backend or set during build
// For now, using the values from .env directly for the demo
const PROJECT_ID = "6965886800118cddfe97";
const ENDPOINT = "https://fra.cloud.appwrite.io/v1";

client
    .setEndpoint(ENDPOINT)
    .setProject(PROJECT_ID);

// DOM Elements
const authBtn = document.getElementById('auth-btn');
const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('file-input');
const appContainer = document.getElementById('app-container');
const previewPanel = document.getElementById('preview-panel');
const originalPreview = document.getElementById('original-preview');
const resultPreview = document.getElementById('result-preview');
const loader = document.getElementById('loader');
const downloadBtn = document.getElementById('download-btn');
const resetBtn = document.getElementById('reset-btn');
const apiStats = document.getElementById('api-stats');

// --- Authentication ---

async function checkAuth() {
    try {
        const user = await account.get();
        authBtn.textContent = `Logged in as ${user.name || user.email}`;
        apiStats.classList.remove('hidden');
        // Fetch API key or other user stats here
    } catch (error) {
        console.log("Not logged in");
        authBtn.textContent = "Login with GitHub";
        apiStats.classList.add('hidden');
    }
}

authBtn.addEventListener('click', () => {
    account.createOAuth2Session('github', 'http://localhost:3000', 'http://localhost:3000');
});

// --- Image Processing ---

dropZone.addEventListener('click', () => fileInput.click());

dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('drag-over');
});

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('drag-over');
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('drag-over');
    if (e.dataTransfer.files.length) {
        handleFile(e.dataTransfer.files[0]);
    }
});

fileInput.addEventListener('change', (e) => {
    if (e.target.files.length) {
        handleFile(e.target.files[0]);
    }
});

function handleFile(file) {
    if (!file.type.startsWith('image/')) return;

    // Show preview
    const reader = new FileReader();
    reader.onload = (e) => {
        originalPreview.src = e.target.result;
        dropZone.classList.add('hidden');
        previewPanel.classList.remove('hidden');
        processImage(file);
    };
    reader.readAsDataURL(file);
}

async function processImage(file) {
    loader.classList.remove('hidden');
    resultPreview.classList.add('hidden');
    downloadBtn.classList.add('hidden');

    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch('/remove-bg', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) throw new Error('Processing failed');

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);

        resultPreview.src = url;
        resultPreview.classList.remove('hidden');
        loader.classList.add('hidden');

        downloadBtn.href = url;
        downloadBtn.download = `auracut_${file.name.split('.')[0]}.png`;
        downloadBtn.classList.remove('hidden');
    } catch (error) {
        console.error(error);
        alert('Failed to process image. Make sure the backend is running.');
        loader.classList.add('hidden');
    }
}

resetBtn.addEventListener('click', () => {
    previewPanel.classList.add('hidden');
    dropZone.classList.remove('hidden');
    fileInput.value = '';
    resultPreview.src = '';
    originalPreview.src = '';
});

// Init
checkAuth();
