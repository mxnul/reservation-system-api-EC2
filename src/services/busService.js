const Bus = require("../models/busModel");

const routeModel = require("../models/routeModel");


const createBus = async (req, res) => {
  try {
    const bus = await Bus.create(req.body);
    res.status(201).json(bus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllBuses = async (req, res) => {
  try {
    const buses = await Bus.find({}).populate("routeId");
    res.status(200).json(buses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBusById = async (req, res) => {
  try {
    const{busId} = req.body;
    const bus = await Bus.findOne({ busId: busId});
    if (!bus) return res.status(404).json({ message: `Cannot find route with ID ${busId}` });
    res.status(200).json(bus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const updateBusById = async (req, res) => {
  try {
    const bus = await Bus.findOneAndUpdate(
      { busId: req.params.busId },
      req.body,
      { new: true }
    );
    if (!bus) return res.status(404).json({ message: "Bus not found" });
    res.status(200).json(bus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const deleteBusById = async (req, res) => {
  try {
    const bus = await Bus.findOneAndDelete({ busId: req.params.busId });
    if (!bus) return res.status(404).json({ message: "Bus not found" });
    res.status(200).json({ message: "Bus deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  createBus,
  getAllBuses,
  getBusById,
  updateBusById,
  deleteBusById,
};
