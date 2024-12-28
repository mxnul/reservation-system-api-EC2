const express = require("express");
const {
  createScheduledTripController,
  getAllScheduledTripsController,
  getScheduledTripByIdController,
  updateScheduledTripByIdController,
  deleteScheduledTripByIdController,
} = require("../controllers/tripController");

const router = express.Router();

router.post("/", createScheduledTripController);
router.get("/", getAllScheduledTripsController);
router.get("/:tripId", getScheduledTripByIdController);
router.put("/:tripId", updateScheduledTripByIdController);
router.delete("/:tripId", deleteScheduledTripByIdController);

module.exports = router;
