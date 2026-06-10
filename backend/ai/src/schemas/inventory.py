from pydantic import BaseModel

class MessageRequest(BaseModel):
    text: str
    user_id: str

class RestockRequest(BaseModel):
    user_id: str
    item: str
    current_stock: float
    sales_history: list[float]
    
class QARequest(BaseModel):
    user_id: str
    question: str
    inventory_context: dict
