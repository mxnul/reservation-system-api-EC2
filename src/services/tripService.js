const ScheduledTrip = require("../models/tripModel");

const createScheduledTrip = async (req, res) => {
  try {
    const trip = await ScheduledTrip.create(req.body);
    res.status(201).json(trip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllScheduledTrips = async (req, res) => {
  try {
    const trips = await ScheduledTrip.find({}).populate("routeId busId");
    res.status(200).json(trips);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getScheduledTripById = async (req, res) => {
  try {
    const{tripId} = req.body;
    const trip = await ScheduledTrip.findOne({ tripId: tripId});
    if (!trip) return res.status(404).json({ message: "Scheduled trip not found" });
    res.status(200).json(trip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateScheduledTripById = async (req, res) => {
  try {
    const trip = await ScheduledTrip.findOneAndUpdate(
      { tripId: req.params.tripId },
      req.body,
      { new: true });
    if (!trip) return res.status(404).json({ message: "Scheduled trip not found" });
    res.status(200).json(trip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteScheduledTripById = async (req, res) => {
  try {
    const trip = await ScheduledTrip.findOneAndDelete({ tripId: req.params.tripId });
    if (!trip) return res.status(404).json({ message: "Scheduled trip not found" });
    res.status(200).json({ message: "Scheduled trip deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createScheduledTrip,
  getAllScheduledTrips,
  getScheduledTripById,
  updateScheduledTripById,
  deleteScheduledTripById,
};
