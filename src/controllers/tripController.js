const {
  createScheduledTrip,
  getAllScheduledTrips,
  getScheduledTripById,
  updateScheduledTripById,
  deleteScheduledTripById,
} = require("../services/tripService");

const createScheduledTripController = async (req, res) => {
  await createScheduledTrip(req, res);
};

const getAllScheduledTripsController = async (req, res) => {
  await getAllScheduledTrips(req, res);
};

const getScheduledTripByIdController = async (req, res) => {
  await getScheduledTripById(req, res);
};

const updateScheduledTripByIdController = async (req, res) => {
  await updateScheduledTripById(req, res);
};

const deleteScheduledTripByIdController = async (req, res) => {
  await deleteScheduledTripById(req, res);
};

module.exports = {
  createScheduledTripController,
  getAllScheduledTripsController,
  getScheduledTripByIdController,
  updateScheduledTripByIdController,
  deleteScheduledTripByIdController,
};
