const ScheduledTrip = require("../models/tripModel");
const Route = require("../models/routeModel");
const Bus = require("../models/busModel");

// Function to create a scheduled trip
const createScheduledTrip = async (req, res) => {
  try {
    const { tripId, routeId, busId, departureTime } = req.body;

    // Check if the route exists
    const route = await Route.findOne({ routeId });
    if (!route) {
      return res.status(404).json({ message: "Route not found" });
    }

    // Check if the bus exists
    const bus = await Bus.findOne({ busId });
    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    // Create the scheduled trip
    const trip = new ScheduledTrip({
      tripId,
      routeId: route.routeId,
      busId: bus.busId,
      departureTime,
    });

    await trip.save();
    res.status(201).json(trip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllScheduledTrips = async (req, res) => {
  try {
    // Fetch all scheduled trips
    const trips = await ScheduledTrip.find({});

    // Fetch associated route and bus details for each trip
    const tripsWithDetails = await Promise.all(
      trips.map(async (trip) => {
        const route = await Route.findOne({ routeId: trip.routeId });
        const bus = await Bus.findOne({ busId: trip.busId });
        return {
          ...trip.toObject(),
          route: route || null, // Include route details (or null if not found)
          bus: bus || null,     // Include bus details (or null if not found)
        };
      })
    );

    res.status(200).json(tripsWithDetails); // Return enriched list of trips
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getScheduledTripById = async (req, res) => {
  try {
    const { tripId } = req.params; // Extract tripId from URL parameter

    const trip = await ScheduledTrip.findOne({ tripId });
    if (!trip) {
      return res.status(404).json({ message: `Scheduled trip with ID ${tripId} not found` });
    }

    const route = await Route.findOne({ routeId: trip.routeId });
    const bus = await Bus.findOne({ busId: trip.busId });

    res.status(200).json({
      ...trip.toObject(),
      route: route || null, // Include route details (or null if not found)
      bus: bus || null,     // Include bus details (or null if not found)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getScheduledTripsByRouteId = async (req, res) => {
  try {
    const { routeId } = req.params; // Extract routeId from URL parameter

    const route = await Route.findOne({ routeId }); // Find the route by routeId (string)
    if (!route) {
      return res.status(404).json({ message: "Route not found" });
    }

    const trips = await ScheduledTrip.find({ routeId: route.routeId });
    if (trips.length === 0) {
      return res.status(404).json({ message: `No scheduled trips found for routeId ${routeId}` });
    }

    const tripsWithBusDetails = await Promise.all(
      trips.map(async (trip) => {
        const bus = await Bus.findOne({ busId: trip.busId });
        return {
          ...trip.toObject(),
          bus: bus || null, // Include bus details (or null if not found)
        };
      })
    );

    res.status(200).json(tripsWithBusDetails); // Return trips with populated bus details
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Function to update a scheduled trip by tripId
const updateScheduledTripById = async (req, res) => {
  try {
    const { tripId } = req.params;
    const { routeId, busId, departureTime } = req.body;

    // Check if the route exists (if updating routeId)
    if (routeId) {
      const route = await Route.findOne({ routeId });
      if (!route) {
        return res.status(404).json({ message: "Route not found" });
      }
    }

    // Check if the bus exists (if updating busId)
    if (busId) {
      const bus = await Bus.findOne({ busId });
      if (!bus) {
        return res.status(404).json({ message: "Bus not found" });
      }
    }

    // Update the scheduled trip
    const updatedTrip = await ScheduledTrip.findOneAndUpdate(
      { tripId },
      { routeId, busId, departureTime },
      { new: true }
    );

    if (!updatedTrip) {
      return res.status(404).json({ message: "Scheduled trip not found" });
    }

    res.status(200).json(updatedTrip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to delete a scheduled trip by tripId
const deleteScheduledTripById = async (req, res) => {
  try {
    const { tripId } = req.params;

    const trip = await ScheduledTrip.findOneAndDelete({ tripId });
    if (!trip) {
      return res.status(404).json({ message: "Scheduled trip not found" });
    }

    res.status(200).json({ message: "Scheduled trip deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createScheduledTrip,
  getAllScheduledTrips,
  getScheduledTripById,
  getScheduledTripsByRouteId, // Exported new method
  updateScheduledTripById,
  deleteScheduledTripById,
};
