const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  let token;
  const authHeader = req.headers.Authorization || req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    // Split and get the token part
    token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }
    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      console.log("The decoded user is:", req.user);
      next();
    } catch (err) {
      return res.status(400).json({ message: "Token is not valid" });
    }
  } else {
    return res.status(401).json({ message: "Authorization header is missing or invalid" });
  }
};

module.exports = verifyToken;
