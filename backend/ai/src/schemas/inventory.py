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

class Transaction(BaseModel):
    item: str
    type: str  # "income" or "expense"
    amount: float
    category: str
    date: str

class InventoryItem(BaseModel):
    item: str
    stock: float
    units_sold_today: float

class DailyPulseRequest(BaseModel):
    user_id: str
    transactions: list[Transaction]
    inventory: list[InventoryItem]
