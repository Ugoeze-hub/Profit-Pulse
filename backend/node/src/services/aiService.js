const axios = require('axios');

// AI Service base URL - defaults to local for development
const AI_SERVICE_URL = process.env.AI_SERVICE_URL;

// Timeout for AI service calls (30 seconds)
const AI_TIMEOUT = 30000;

/**
 * Call AI service to predict restock needs
 */
const predictRestock = async (userId, item, currentStock, salesHistory) => {
  try {
    const response = await axios.post(
      `${AI_SERVICE_URL}/predict-restock`,
      {
        user_id: userId,
        item,
        current_stock: currentStock,
        sales_history: salesHistory
      },
      { timeout: AI_TIMEOUT }
    );
    return response.data;
  } catch (error) {
    console.error('AI Service - Restock Prediction Error:', error.message);
    throw new Error(`AI service error: ${error.message}`);
  }
};

/**
 * Call AI service to parse inventory message
 */
const parseInventoryMessage = async (userId, text) => {
  try {
    const response = await axios.post(
      `${AI_SERVICE_URL}/parse-message`,
      {
        user_id: userId,
        text
      },
      { timeout: AI_TIMEOUT }
    );
    return response.data;
  } catch (error) {
    console.error('AI Service - Message Parse Error:', error.message);
    throw new Error(`AI service error: ${error.message}`);
  }
};

/**
 * Call AI service to answer business questions
 */
const askBusinessQuestion = async (userId, question, inventoryContext) => {
  try {
    const response = await axios.post(
      `${AI_SERVICE_URL}/ask`,
      {
        user_id: userId,
        question,
        inventory_context: inventoryContext
      },
      { timeout: AI_TIMEOUT }
    );
    return response.data;
  } catch (error) {
    console.error('AI Service - Q&A Error:', error.message);
    throw new Error(`AI service error: ${error.message}`);
  }
};

/**
 * Call AI service to generate daily pulse
 */
const generateDailyPulse = async (userId, transactions, inventory) => {
  try {
    const response = await axios.post(
      `${AI_SERVICE_URL}/daily-pulse`,
      {
        user_id: userId,
        transactions,
        inventory
      },
      { timeout: AI_TIMEOUT }
    );
    return response.data;
  } catch (error) {
    console.error('AI Service - Daily Pulse Error:', error.message);
    throw new Error(`AI service error: ${error.message}`);
  }
};

/**
 * Call AI service to scan receipt
 */
const scanReceipt = async (userId, fileBuffer, fileName) => {
  try {
    const formData = new FormData();
    formData.append('user_id', userId);
    formData.append('file', new Blob([fileBuffer]), fileName);

    const response = await axios.post(
      `${AI_SERVICE_URL}/scan-receipt`,
      formData,
      {
        headers: formData.getHeaders ? formData.getHeaders() : { 'Content-Type': 'multipart/form-data' },
        timeout: AI_TIMEOUT
      }
    );
    return response.data;
  } catch (error) {
    console.error('AI Service - Receipt Scan Error:', error.message);
    throw new Error(`AI service error: ${error.message}`);
  }
};

module.exports = {
  predictRestock,
  parseInventoryMessage,
  askBusinessQuestion,
  generateDailyPulse,
  scanReceipt
};
