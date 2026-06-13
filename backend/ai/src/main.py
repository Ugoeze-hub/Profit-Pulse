from dotenv import load_dotenv
load_dotenv()
from fastapi import FastAPI
from src.routes.inventory import router as inventory_router


app = FastAPI(title="Inventory AI Service")

app.include_router(inventory_router, prefix="/ai")

@app.get("/health")
def health_check():
    return {"status": "AI service is running"}