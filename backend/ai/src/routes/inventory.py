from fastapi import APIRouter, HTTPException
from src.schemas.inventory import MessageRequest, RestockRequest, QARequest, DailyPulseRequest
from src.services.message_parser import parse_inventory_message
from src.services.restock_predictor import predict_restock
from src.services.qa_service import answer_business_question
from src.services.daily_pulse_service import generate_daily_pulse



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