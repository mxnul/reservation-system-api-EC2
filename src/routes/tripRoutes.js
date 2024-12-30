const express = require("express");
const {
  createScheduledTripController,
  getAllScheduledTripsController,
  getScheduledTripByIdController,
  getScheduledTripsByRouteIdController,
  updateScheduledTripByIdController,
  deleteScheduledTripByIdController,
 
} = require("../controllers/tripController");

const router = express.Router();

router.post("/", createScheduledTripController);
router.get("/", getAllScheduledTripsController);
router.get("/:tripId", getScheduledTripByIdController);
router.get("/route/:routeId",getScheduledTripsByRouteIdController);
router.put("/:tripId", updateScheduledTripByIdController);
router.delete("/:tripId", deleteScheduledTripByIdController);

module.exports = router;
