from fastapi import APIRouter, HTTPException, UploadFile, File
from src.schemas.inventory import MessageRequest, RestockRequest, QARequest, DailyPulseRequest
from src.services.message_parser import parse_inventory_message
from src.services.restock_predictor import predict_restock
from src.services.qa_service import answer_business_question
from src.services.daily_pulse import generate_daily_pulse
from src.services.receipt_scanner import scan_receipt




router = APIRouter()

@router.post("/parse-message")
def parse_message(request: MessageRequest):
    try:
        result = parse_inventory_message(request.text)
        return {"user_id": request.user_id, "activity": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@router.post("/predict-restock")
def restock_prediction(request: RestockRequest):
    try:
        result = predict_restock(
            item=request.item,
            current_stock=request.current_stock,
            sales_history=request.sales_history
        )
        return {"user_id": request.user_id, "prediction": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@router.post("/ask")
def ask_question(request: QARequest):
    try:
        answer = answer_business_question(
            question=request.question,
            inventory_context=request.inventory_context
        )
        return {"user_id": request.user_id, "answer": answer}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@router.post("/daily-pulse")
def daily_pulse(request: DailyPulseRequest):
    try:
        result = generate_daily_pulse(
            transactions=[t.dict() for t in request.transactions],
            inventory=[i.dict() for i in request.inventory]
        )
        return {"user_id": request.user_id, "pulse": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@router.post("/scan-receipt")
async def scan_receipt_endpoint(
    user_id: str,
    file: UploadFile = File(...)
):
    try:
        # Validate file type
        if file.content_type not in ["image/jpeg", "image/png", "image/jpg"]:
            raise HTTPException(
                status_code=400, 
                detail="Only PNG and JPG images are supported"
            )
        
        image_bytes = await file.read()
        result = scan_receipt(image_bytes, mime_type=file.content_type)
        
        return {
            "user_id": user_id,
            "receipt": result
        }
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))