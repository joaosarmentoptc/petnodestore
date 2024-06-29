const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const env = process.env.NODE_ENV || 'development';
const { jwtSecret } = config[env];
function verifyToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Access denied' });
    try {
        const decoded = jwt.verify(token, jwtSecret);
        console.log(decoded);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = verifyToken;