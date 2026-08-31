# Use Python 3.10 slim image for a smaller footprint
FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Install system dependencies
# libgl1-mesa-glx is required for opencv/pillow operations often used in image processing
RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements file
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Expose port 3000
EXPOSE 3000

# Command to run the application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "3000"]
