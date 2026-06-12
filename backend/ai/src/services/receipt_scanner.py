import google.generativeai as genai
import os
import json
import base64

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel("gemini-2.5-flash")

def scan_receipt(image_bytes: bytes, mime_type: str = "image/jpeg") -> dict:
    # Convert image to base64 for Gemini Vision
    image_data = base64.b64encode(image_bytes).decode("utf-8")
    
    prompt = """
    You are a receipt scanner for a Nigerian market trader.
    Extract all information from this receipt and return ONLY a JSON object, nothing else.
    No markdown, no explanation, just JSON.
    
    Return exactly this structure:
    {
        "vendor": "supplier or store name if visible, else null",
        "date": "date on receipt if visible, else null",
        "total": total amount as a number or null,
        "currency": "NGN",
        "items": [
            {
                "name": "product name",
                "quantity": number or null,
                "unit": "bags/cartons/pieces/kg etc or null",
                "unit_price": number or null,
                "total_price": number or null
            }
        ],
        "confidence": "high/medium/low based on receipt image quality"
    }
    
    Rules:
    - Extract every line item you can see
    - If a value is unclear or not visible, use null
    - Convert all prices to numbers, remove currency symbols
    - Normalize Nigerian product names (e.g. "INDO NOODLES" → "Indomie Noodles")
    - If this is not a receipt, return { "error": "Not a valid receipt" }
    """
    
    response = model.generate_content([
        {
            "role": "user",
            "parts": [
                {
                    "inline_data": {
                        "mime_type": mime_type,
                        "data": image_data
                    }
                },
                {"text": prompt}
            ]
        }
    ])
    
    raw = response.text.strip().replace("```json", "").replace("```", "").strip()
    result = json.loads(raw)
    
    if "error" in result:
        raise ValueError(result["error"])
        
    return result