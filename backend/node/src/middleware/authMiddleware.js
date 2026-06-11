const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  try {
    // 1. Grab the token sent by the frontend inside the HTTP headers
    const authHeader = req.headers.authorization;
    
    // 2. If there is no token, lock them out instantly
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Access denied. Please log in first.' });
    }

    // Split "Bearer eyJhbGci..." to grab just the token string
    const token = authHeader.split(' ')[1];

    // 3. Verify the token using your exact single-line secret key from your .env
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    
    // 4. Extract the userId from the token and inject it into the request object
    req.userId = decoded.userId;
    
    // 5. Everything is clean! Pass control to your settings controller
    next(); 
  } catch (error) {
    return res.status(403).json({ error: 'Your session has expired. Please log in again.' });
  }
};

module.exports = verifyToken;