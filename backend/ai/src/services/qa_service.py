from google import genai
import os
import json

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
def answer_business_question(question: str, inventory_context: dict):
    prompt = f"""
    You are a helpful business assistant for a Nigerian market trader.
    Answer the trader's question based ONLY on the inventory data provided.
    
    Rules:
    - Respond in the same language the trader used (English, Pidgin, Yoruba, Igbo, Hausa)
    - Be concise and conversational, like a smart friend not a robot
    - If the data doesn't contain enough info to answer, say so honestly
    - Use Nigerian context (mention Naira ₦ for money, relate to Nigerian market)
    - Never make up data that isn't in the context
    
    Trader's inventory data:
    {json.dumps(inventory_context, indent=2)}
    
    Trader's question: "{question}"
    
    Answer:
    """
    
    response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents=prompt
)
    return response.text.strip()