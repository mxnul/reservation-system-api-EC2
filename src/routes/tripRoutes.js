const express = require("express");
const {
  createScheduledTripController,
  getAllScheduledTripsController,
  getScheduledTripByIdController,
  getScheduledTripsByRouteIdController,
  updateScheduledTripByIdController,
  deleteScheduledTripByIdController,
} = require("../controllers/tripController");

const verifyToken = require("../middlewares/authMiddleware");  // Assuming this is your token verification middleware
const authorizeRoles = require("../middlewares/roleMiddleware"); // Assuming this is your role-checking middleware

const router = express.Router();

// Only admins can create a scheduled trip
router.post("/", verifyToken, authorizeRoles("admin"), createScheduledTripController);

// Public route: anyone can view all scheduled trips
router.get("/", getAllScheduledTripsController);

// Public route: anyone can view a scheduled trip by its ID
router.get("/:tripId", getScheduledTripByIdController);

// Public route: anyone can view scheduled trips by route ID
router.get("/route/:routeId", getScheduledTripsByRouteIdController);

// Only admins can update a scheduled trip by ID
router.put("/:tripId", verifyToken, authorizeRoles("admin"), updateScheduledTripByIdController);

// Only admins can delete a scheduled trip by ID
router.delete("/:tripId", verifyToken, authorizeRoles("admin"), deleteScheduledTripByIdController);

module.exports = router;
