const express = require("express");
const verifyToken = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");
const router = express.Router();



//Only admin can access this router 
router.get ("/admin", verifyToken, authorizeRoles("admin"),(req, res) => {
  res.json({message: " Welcome Admin"});
});



//operaters and admin can access this router
router.get ("/operater",verifyToken,authorizeRoles("admin","operater"),(req, res) => {
  res.json({message: "Welcome operator "});
});



router.get(
  "/commuter",
  verifyToken,
  authorizeRoles("admin", "operator", "commuter"),
  (req, res) => {
    res.json({ message: "Welcome user" });
  }
);



module.exports = router;