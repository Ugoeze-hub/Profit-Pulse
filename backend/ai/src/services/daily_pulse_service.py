import google.generativeai as genai
import os
import json

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel("gemini-2.5-flash")

def generate_daily_pulse(transactions: list, inventory: list) -> dict:
    prompt = f"""
    You are a trusted business advisor for a Nigerian market trader.
    Analyze today's business data and return ONLY a JSON object, nothing else.
    No markdown, no explanation, just JSON.
    
    Transaction data:
    {json.dumps(transactions, indent=2)}
    
    Inventory data:
    {json.dumps(inventory, indent=2)}
    
    Return exactly this structure:
    {{
        "summary": "A warm, conversational 1-2 sentence overview of today's performance. Include actual Naira figures.",
        "top_earner": "The single best performing product today with its revenue figure in Naira",
        "warning": "One specific thing worth watching — could be high expense, low stock, or unusual pattern. Be specific with figures.",
        "tip": "One actionable recommendation for tomorrow based on the data. Be specific and practical."
    }}
    
    Rules:
    - Use ₦ for all money figures
    - Be conversational, like a smart friend not a bank statement
    - Base everything strictly on the data provided, never invent figures
    - Keep each field to 1-2 sentences maximum
    - If data is insufficient for any field, say so honestly in that field
    """
    
    response = model.generate_content(prompt)
    raw = response.text.strip().replace("```json", "").replace("```", "").strip()
    return json.loads(raw)