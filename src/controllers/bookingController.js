const {
  createBooking,
  getAllBookings,
  getBookingById,
  cancelBooking,
} = require("../services/bookingService");

const createBookingController = async (req, res) => {
  await createBooking(req, res);
};

const getAllBookingsController = async (req, res) => {
  await getAllBookings(req, res);
};

const getBookingByIdController = async (req, res) => {
  await getBookingById(req, res);
};

const cancelBookingController = async (req, res) => {
  await cancelBooking(req, res);
};

module.exports = {
  createBookingController,
  getAllBookingsController,
  getBookingByIdController,
  cancelBookingController,
};
