const express = require("express");

const { 
  createRouteController,
  getRouteController,
  getRouteByIdController,
  updateRouteByIdController,
  deleteRouteByIdController 
} = require("../controllers/routeController");

const verifyToken = require("../middlewares/authMiddleware");  // Assuming it's defined as in your authMiddleware
const authorizeRoles = require("../middlewares/roleMiddleware"); // Assuming it's defined as in your roleMiddleware

const router = express.Router();

// Only admins can create routes
router.post("/", verifyToken, authorizeRoles("admin"), createRouteController);

// Anyone can get the routes
router.get("/", getRouteController);

// Only admins can get a specific route
router.get("/:routeId", verifyToken, authorizeRoles("admin"), getRouteByIdController);

// Only admins can update a specific route
router.put("/:routeId", verifyToken, authorizeRoles("admin"), updateRouteByIdController);

// Only admins can delete a specific route
router.delete("/:routeId", verifyToken, authorizeRoles("admin"), deleteRouteByIdController);

module.exports = router;
