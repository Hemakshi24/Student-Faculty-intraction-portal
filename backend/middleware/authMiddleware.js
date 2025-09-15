const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, email: decoded.email, role: decoded.role, name: decoded.name };
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
}

function requireRole(role) {
  return function (req, res, next) {
    if (!req.user) return res.status(401).json({ message: "Not authenticated" });
    if (Array.isArray(role)) {
      if (!role.includes(req.user.role)) return res.status(403).json({ message: "Forbidden" });
    } else {
      if (req.user.role !== role) return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
}

module.exports = { authMiddleware, requireRole };
