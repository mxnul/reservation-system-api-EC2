const Bus = require('../models/busModel');
const Route = require('../models/routeModel');

// Function to create a bus
const createBus = async (req, res) => {
  try {
    // First, check if the route exists by routeId (e.g., "001")
    const route = await Route.findOne({ routeId: req.body.routeId });
    if (!route) {
      return res.status(404).json({ message: "Route not found" });
    }

    // Check if the busId already exists
    const existingBus = await Bus.findOne({ busId: req.body.busId });
    if (existingBus) {
      return res.status(400).json({ message: "Bus ID already exists" });
    }

    // Create the bus with the found routeId
    const bus = new Bus({
      busId: req.body.busId,
      routeId: route.routeId,  // Use the routeId (string)
      capacity: req.body.capacity,
    });

    await bus.save();
    res.status(201).json(bus); // Return the created bus
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllBuses = async (req, res) => {
  try {
    // Fetch all buses
    const buses = await Bus.find({});

    // Fetch associated route details for each bus
    const busesWithRoutes = await Promise.all(
      buses.map(async (bus) => {
        const route = await Route.findOne({ routeId: bus.routeId });
        return {
          ...bus.toObject(),
          route: route || null, // Include the route details (or null if not found)
        };
      })
    );

    res.status(200).json(busesWithRoutes); // Return the enriched list of buses
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Function to get a bus by busId
const getBusById = async (req, res) => {
  try {
    const { busId } = req.params; // Extract busId from URL parameter

    const bus = await Bus.findOne({ busId }).populate("routeId");
    
    if (!bus) {
      return res.status(404).json({ message: `Bus with ID ${busId} not found` });
    }
    
    res.status(200).json(bus);  // Return the bus with populated routeId
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to get buses by routeId
const getBusesByRouteId = async (req, res) => {
  try {
    const { routeId } = req.params; // Extract routeId from URL parameter
    
    const route = await Route.findOne({ routeId }); // Find route by routeId (string)
    if (!route) {
      return res.status(404).json({ message: "Route not found" });
    }
    
    const buses = await Bus.find({ routeId });  // Fetch all buses with this routeId
    
    if (buses.length === 0) {
      return res.status(404).json({ message: "No buses found for this route" });
    }
    
    res.status(200).json(buses);  // Return the buses associated with this route
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to update a bus by busId
const updateBusById = async (req, res) => {
  try {
    const { busId } = req.params;  // Extract busId from URL parameter

    // Check if the bus exists
    const bus = await Bus.findOne({ busId });
    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    // Check if the routeId exists
    const route = await Route.findOne({ routeId: req.body.routeId });  // Using routeId string
    if (!route) {
      return res.status(404).json({ message: "Route not found" });
    }

    // Update the bus with the new routeId and capacity
    const updatedBus = await Bus.findOneAndUpdate({ busId }, req.body, { new: true });

    res.status(200).json(updatedBus);  // Return the updated bus
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to delete a bus by busId
const deleteBusById = async (req, res) => {
  try {
    const { busId } = req.params;  // Extract busId from URL parameter
    
    // Find and delete the bus
    const bus = await Bus.findOneAndDelete({ busId });
    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    res.status(200).json({ message: "Bus deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBus,
  getAllBuses,
  getBusById,
  getBusesByRouteId,
  updateBusById,
  deleteBusById,
};
