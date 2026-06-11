require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { PrismaClient } = require('@prisma/client');
const authRoutes = require("./routes/authRoute.js")
const settingsRoutes = require("./routes/settingsRoutes.js")
const transactionRoutes = require("./routes/transactionRoutes.js");
const dashboardRoutes = require("./routes/dashboardRoutes.js");
const invoiceRoutes = require("./routes/invoiceRoutes.js");

const inventoryRoutes = require("./routes/inventoryRoutes.js");

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/user', settingsRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.use('/api/invoices', invoiceRoutes);



app.use('/api/inventory', inventoryRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  
  
  try {
    await prisma.$connect();
    console.log('Neon Database connected successfully via Prisma!');
  } catch (error) {
    console.error('Database connection failed:', error.message);
  }
});