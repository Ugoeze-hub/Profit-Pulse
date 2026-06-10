'''
This module contains the logic for predicting when an item will run out of stock based on current inventory levels and sales history. 
It provides insights on how urgently the item needs to be restocked and recommends a quantity to order.
The prediction is based on a simple average daily sales calculation, which can be enhanced in the future with more sophisticated algorithms or machine learning models.
The main function `predict_restock` takes the item name, current stock level, and a list of past daily sales figures to calculate:
- Average daily sales
- Estimated days until stockout
- Recommended restock quantity (e.g., enough for one week of sales)
- Urgency level (critical, high, medium, low) based on how soon the stock will run out
- A user-friendly alert message to guide the trader on when to restock.
'''


def predict_restock(item: str, current_stock: float, sales_history: list[float]):
    if not sales_history:
        return {
            "item": item,
            "days_until_stockout": None,
            "recommended_restock": None,
            "message": "Not enough sales history to predict"
        }
    
    avg_daily_sales = sum(sales_history) / len(sales_history)
    
    if avg_daily_sales == 0:
        return {
            "item": item,
            "days_until_stockout": None,
            "recommended_restock": None,
            "message": "No sales recorded for this item yet"
        }
    
    days_until_stockout = round(current_stock / avg_daily_sales)
    recommended_restock = round(avg_daily_sales * 7)  # one week buffer
    
    # Determine urgency
    if days_until_stockout <= 1:
        urgency = "critical"
        alert = f"You will run out of {item} tomorrow. Restock immediately."
    elif days_until_stockout <= 3:
        urgency = "high"
        alert = f"You have about {days_until_stockout} days of {item} left. Restock soon."
    elif days_until_stockout <= 7:
        urgency = "medium"
        alert = f"You have about {days_until_stockout} days of {item} left."
    else:
        urgency = "low"
        alert = f"Your {item} stock is healthy for the next {days_until_stockout} days."
    
    return {
        "item": item,
        "avg_daily_sales": round(avg_daily_sales, 2),
        "days_until_stockout": days_until_stockout,
        "recommended_restock": recommended_restock,
        "urgency": urgency,
        "alert": alert
    }