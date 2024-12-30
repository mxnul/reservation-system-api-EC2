const express = require("express");
const {
  createBusController,
  getAllBusesController,
  getBusByIdController,
  getBusesByRouteIdController,
  updateBusByIdController,
  deleteBusByIdController,
} = require("../controllers/busController");

const verifyToken = require("../middlewares/authMiddleware");  // Your token verification middleware
const authorizeRoles = require("../middlewares/roleMiddleware"); // Your role-checking middleware

const router = express.Router();

// Allow only admins and operators to create a bus
router.post("/", verifyToken, authorizeRoles("admin", "operater"), createBusController);

// Public route: anyone can get all buses
router.get("/", getAllBusesController);

// Public route: anyone can get a bus by its ID
router.get("/:busId", getBusByIdController);

// Public route: anyone can get buses by routeId
router.get("/route/:routeId", getBusesByRouteIdController);

// Allow only admins and operators to update a bus by its ID
router.put("/:busId", verifyToken, authorizeRoles("admin", "operater"), updateBusByIdController);

// Allow only admins and operators to delete a bus by its ID
router.delete("/:busId", verifyToken, authorizeRoles("admin", "operater"), deleteBusByIdController);

module.exports = router;
