module.exports = (req, res, next) => {

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized: Missing or invalid token' });
    }

    // Mock user id extraction from token (example)
    const [, token] = authHeader.split(' ');
    req.userId = token;

    return next();
};