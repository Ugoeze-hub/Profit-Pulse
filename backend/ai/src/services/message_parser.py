from google import genai
import os
import json

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

def parse_inventory_message(text: str):
    prompt = f"""
    You are an inventory assistant for a Nigerian market trader.
    Parse this message and return ONLY a JSON object, nothing else.
    No markdown, no explanation, just JSON.
    
    Message: "{text}"
    
    Always return this exact structure regardless of how many items:
    {{
        "items": [
            {{"action": "deduct/add/check/unknown", "item": "product name lowercase", "quantity": number or null, "unit": "string or null"}}
        ]
    }}
    
    Examples:
    "I sold 10 bags of rice" → {{"items": [{{"action": "deduct", "item": "rice", "quantity": 10, "unit": "bags"}}]}}
    "Add 20 rice and sold 5 sugar" → {{"items": [{{"action": "add", "item": "rice", "quantity": 20, "unit": null}}, {{"action": "deduct", "item": "sugar", "quantity": 5, "unit": null}}]}}
    """
    
    response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents=prompt
)
    # Strip any markdown formatting Gemini might add
    raw = response.text.strip().replace("```json", "").replace("```", "").strip()
    
    return json.loads(raw)

