const jwt = require('jsonwebtoken');
const config = require('../../config/config');

const env = process.env.NODE_ENV || 'development';
const { jwtSecret, jwtExpires } = config[env];

function verifyToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Access denied' });
    try {
        const decoded = jwt.verify(token, jwtSecret);

        req.userId = decoded.userId;
        return next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};

function signJwt(userData){
    return jwt.sign({ userId: userData.id, email: userData.email, firstname: userData.firstname, lastname: userData.lastname }, 
                jwtSecret, 
                { expiresIn: jwtExpires });
}

module.exports = {
    verifyToken, 
    signJwt
};