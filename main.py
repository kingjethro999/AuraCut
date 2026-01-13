import os
import io
from fastapi import FastAPI, File, UploadFile, HTTPException, Header, Depends
from fastapi.responses import StreamingResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from rembg import remove, new_session
from PIL import Image
from dotenv import load_dotenv
from appwrite.client import Client
from appwrite.services.databases import Databases

load_dotenv()

app = FastAPI(title="AuraCut API")

# Appwrite Setup
client = Client()
client.set_endpoint(os.getenv("APPWRITE_ENDPOINT"))
client.set_project(os.getenv("APPWRITE_PROJECT_ID"))
client.set_key(os.getenv("APPWRITE_API_KEY_SECRET"))

databases = Databases(client)
DB_ID = os.getenv("APPWRITE_DB_NAME")
COLLECTION_ID = "api_keys" # Assuming this collection name

# Initialize rembg session at startup for performance
# 'birefnet-general' is the 2026 standard for professional-grade results
session = new_session("birefnet-general")

# Helper to validate API Key against Appwrite
async def validate_api_key(api_key: str = Header(...)):
    try:
        # Search for the API key in the 'api_keys' collection
        # This is a simplified check. In a production app, you'd handle hashing and specific user mapping.
        result = databases.list_documents(
            database_id=DB_ID,
            collection_id=COLLECTION_ID,
            queries=[f'equal("key", ["{api_key}"])']
        )
        if result['total'] == 0:
            raise HTTPException(status_code=403, detail="Invalid API Key")
        return result['documents'][0]
    except Exception as e:
        print(f"Auth Error: {e}")
        raise HTTPException(status_code=403, detail="Authentication Failed")

@app.post("/remove-bg")
async def remove_background(
    file: UploadFile = File(...),
    # Uncomment next line to enable API key validation once DB is setup
    # user_data: dict = Depends(validate_api_key) 
):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")

    try:
        input_image = await file.read()
        
        # Remove background with advanced parameters
        # alpha_matting: use alpha matting to get better edges
        output_image = remove(
            input_image,
            session=session,
            alpha_matting=True,
            alpha_matting_foreground_threshold=240,
            alpha_matting_background_threshold=10,
            alpha_matting_erode_size=10
        )
        
        return StreamingResponse(io.BytesIO(output_image), media_type="image/png")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Serve static files for frontend
@app.get("/")
async def read_index():
    return FileResponse("index.html")

app.mount("/", StaticFiles(directory=".", html=True), name="static")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=3000)
