// middleware/authorize.js
const authorize = (allowedRoles) => {
    return (req, res, next) => {
        const userRole = req.user.role;
        if (!allowedRoles.includes(userRole)) {
            return res.status(403).json({ message: 'Acceso denegado.' });
        }
        next();
    };
};


module.exports = authorize;
