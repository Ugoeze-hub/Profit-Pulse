# ProfitPulse AI Service — API Documentation

**Base URL:** `https://profit-pulse-jnhd.onrender.com`  
**Version:** 1.0.0  
**Language Support:** English, Pidgin, Yoruba, Igbo, Hausa

---

## Authentication
JS handles

---

## Endpoints

---

### GET /health
Check if the AI service is running.

**Request**
```
GET /health
```

**Response**
```json
{
  "status": "AI service is running"
}
```

---

### POST /ai/parse-message
Parse a natural language inventory update from a trader into structured JSON.
Handles English, Pidgin, and Nigerian languages. Supports single and multiple items.

**Request**
```
POST /ai/parse-message
Content-Type: application/json
```

```json
{
  "text": "I sold 10 bags of rice and added 5 cartons of milo",
  "user_id": "123"
}
```

| Field | Type | Required | Description |
|---|---|---|---|
| text | string | Yes | Natural language message from trader |
| user_id | string | Yes | Unique identifier for the trader |

**Response**
```json
{
  "user_id": "123",
  "parsed": {
    "items": [
      {
        "action": "deduct",
        "item": "rice",
        "quantity": 10,
        "unit": "bags"
      },
      {
        "action": "add",
        "item": "milo",
        "quantity": 5,
        "unit": "cartons"
      }
    ]
  }
}
```

| Field | Type | Description |
|---|---|---|
| action | string | One of: `add`, `deduct`, `check`, `unknown` |
| item | string | Product name in lowercase |
| quantity | number / null | Quantity mentioned |
| unit | string / null | Unit of measurement |

**Notes**
- Always returns an `items` array — loop through it, never expect a single object
- Works with Pidgin: "I don sell 5 cartons of milo" → `action: deduct`

---

### POST /ai/predict-restock
Calculate days until a product runs out and recommended restock quantity based on sales history.

**Request**
```
POST /ai/predict-restock
Content-Type: application/json
```

```json
{
  "user_id": "123",
  "item": "rice",
  "current_stock": 5,
  "sales_history": [10, 8, 12, 9, 11]
}
```

| Field | Type | Required | Description |
|---|---|---|---|
| user_id | string | Yes | Unique identifier for the trader |
| item | string | Yes | Product name |
| current_stock | number | Yes | Current units in stock |
| sales_history | number[] | Yes | Array of daily sales figures (most recent last) |

**Response**
```json
{
  "user_id": "123",
  "prediction": {
    "item": "rice",
    "avg_daily_sales": 10.0,
    "days_until_stockout": 0,
    "recommended_restock": 70,
    "urgency": "critical",
    "alert": "You will run out of rice tomorrow. Restock immediately."
  }
}
```

| Urgency | Meaning |
|---|---|
| critical | 0–1 days left |
| high | 2–3 days left |
| medium | 4–7 days left |
| low | 7+ days left |

**Notes**
- Uses deterministic math, not AI — results are consistent across calls
- Pass `sales_history` as an array of daily units sold
- Empty `sales_history` returns null predictions with a message

---

### POST /ai/ask
Answer a trader's freeform business question using their inventory and sales context.
Responds in the same language the trader used.

**Request**
```
POST /ai/ask
Content-Type: application/json
```

```json
{
  "user_id": "123",
  "question": "wetin be my best selling product this week?",
  "inventory_context": {
    "products": [
      {"item": "rice", "stock": 20, "units_sold_this_week": 45},
      {"item": "garri", "stock": 5, "units_sold_this_week": 12},
      {"item": "sugar", "stock": 30, "units_sold_this_week": 8}
    ]
  }
}
```

| Field | Type | Required | Description |
|---|---|---|---|
| user_id | string | Yes | Unique identifier for the trader |
| question | string | Yes | Freeform question in any language |
| inventory_context | object | Yes | Current inventory and sales data |

**Response**
```json
{
  "user_id": "123",
  "answer": "Na rice be your best seller this week! You don sell 45 units — e dey lead by far."
}
```

**Notes**
- AI responds in the same language as the question — English, Pidgin, Yoruba etc.
- Pass as much context as possible for better answers
- If data is insufficient, AI will say so honestly rather than guessing

---

### POST /ai/daily-pulse
Generate an AI-powered daily business summary for a trader's dashboard.
Powers the Pulse Card on the dashboard and the Pulse summary page.

**Request**
```
POST /ai/daily-pulse
Content-Type: application/json
```

```json
{
  "user_id": "123",
  "transactions": [
    {"item": "Indomie Sales", "type": "income", "amount": 24500, "category": "Sales", "date": "today"},
    {"item": "Transport", "type": "expense", "amount": 1800, "category": "Transport", "date": "today"},
    {"item": "Rice Bags", "type": "expense", "amount": 40000, "category": "Stock", "date": "yesterday"}
  ],
  "inventory": [
    {"item": "Indomie", "stock": 10, "units_sold_today": 30},
    {"item": "Soft Drinks", "stock": 3, "units_sold_today": 12}
  ]
}
```

| Field | Type | Required | Description |
|---|---|---|---|
| user_id | string | Yes | Unique identifier for the trader |
| transactions | array | Yes | Today's income and expense transactions |
| inventory | array | Yes | Current stock levels and today's sales |

**Transaction object**

| Field | Type | Description |
|---|---|---|
| item | string | Transaction name |
| type | string | `income` or `expense` |
| amount | number | Amount in Naira |
| category | string | Sales / Transport / Stock / Staff / Other |
| date | string | `today` or `yesterday` |

**Response**
```json
{
  "user_id": "123",
  "pulse": {
    "summary": "Today was a strong day — you brought in ₦24,500 and kept costs lean at ₦1,800.",
    "top_earner": "Indomie Noodles led today with ₦24,500 in revenue.",
    "warning": "Soft Drinks stock is critically low at 3 units after selling 12 today.",
    "tip": "Restock Soft Drinks first thing tomorrow — demand is outpacing supply."
  }
}
```

**Notes**
- Call this on dashboard load and when "AI Summary" is clicked on the Pulse page
- Same endpoint powers both pages
- All amounts returned in Naira with ₦ symbol

---

### POST /ai/scan-receipt
Extract structured data from a receipt image using Gemini Vision.
Supports PNG and JPG formats up to 5MB.

**Request**
```
POST /ai/scan-receipt
Content-Type: multipart/form-data
```

| Field | Type | Required | Description |
|---|---|---|---|
| user_id | string | Yes | Unique identifier for the trader |
| file | file | Yes | Receipt image — PNG or JPG only, max 5MB |

**Response**
```json
{
  "user_id": "123",
  "receipt": {
    "vendor": "BuyBetter",
    "date": "05-06-2026",
    "total": 19375,
    "currency": "NGN",
    "items": [
      {
        "name": "Kojie San 3in1 Soap",
        "quantity": 1,
        "unit": null,
        "unit_price": 6343,
        "total_price": 6343
      }
    ],
    "confidence": "high"
  }
}
```

| Confidence | Meaning |
|---|---|
| high | Clear image, all fields extracted |
| medium | Some fields unclear or missing |
| low | Poor image quality, extraction may be incomplete |

**Error Response**
```json
{
  "detail": "Not a valid receipt"
}
```

**Notes**
- After extraction, save items directly to the trader's inventory/products table
- Unsupported file types return HTTP 400
- For best results, receipt should be well-lit and all text visible

---

## Error Codes

| Code | Meaning |
|---|---|
| 200 | Success |
| 400 | Bad request — invalid file type or not a valid receipt |
| 500 | Internal server error — check request body shape |

---

## Interactive Docs
Full interactive documentation available at:
```
https://profit-pulse-jnhd.onrender.com/docs
```

---

ProfitPulse AI Service 