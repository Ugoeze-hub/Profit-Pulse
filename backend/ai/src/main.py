from fastapi import FastAPI
from dotenv import load_dotenv
from src.routes.inventory import router as inventory_router

load_dotenv()

app = FastAPI(title="Inventory AI Service")

app.include_router(inventory_router, prefix="/ai")

@app.get("/health")
def health_check():
    return {"status": "AI service is running"}