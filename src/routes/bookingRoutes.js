const express = require("express");
const {
  createBookingController,
  getAllBookingsController,
  getBookingByIdController,
  cancelBookingController,
} = require("../controllers/bookingController");

const router = express.Router();

router.post("/", createBookingController);
router.get("/", getAllBookingsController);
router.get("/:bookingId", getBookingByIdController);
router.put("/:bookingId/cancel", cancelBookingController);

module.exports = router;
