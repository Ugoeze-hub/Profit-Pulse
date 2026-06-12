
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;


const signup = async (req, res) => {
  try {
    const { fullName, businessName, email, phone, password } = req.body;

    
    if (!fullName || !businessName || !email || !password) {
      return res.status(400).json({ error: 'All required fields must be filled' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }


    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() }
    });

    if (existingUser) {
      return res.status(400).json({ error: 'An account with this email already exists' });
    }


    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    
    const newUser = await prisma.user.create({
      data: {
        fullName: fullName.trim(),
        businessName: businessName.trim(),
        email: email.toLowerCase().trim(),
        phone: phone ? phone.trim() : null,
        password: hashedPassword
      }
    });


    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email },
      JWT_SECRET_KEY,
      { expiresIn: '24h' }
    );

    return res.status(201).json({
      message: 'Account created successfully!',
      token,
      user: {
        id: newUser.id,
        fullName: newUser.fullName,
        businessName: newUser.businessName,
        email: newUser.email,
        balance: newUser.balance
      }
    });

  } catch (error) {
    return res.status(500).json({ error: 'Server error during signup', details: error.message });
  }
};


const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() }
    });

    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // 2. Verify password with bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET_KEY,
      { expiresIn: '24h' }
    );

    return res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        businessName: user.businessName,
        email: user.email,
        balance: user.balance
      }
    });

  } catch (error) {
    return res.status(500).json({ error: 'Server error during login', details: error.message });
  }
};

module.exports = {
  signup,
  login
};