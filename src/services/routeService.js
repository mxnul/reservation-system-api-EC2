const Route = require("../models/routeModel");

const createRoute = async(req, res) => {
  try {
    const existingRoute = await Route.findOne({ routeId: req.body.routeId });
    if (existingRoute) {
      return res.status(400).json({ message: "Route ID already exists" });
    }
    const route = await Route.create(req.body);
    res.status(201).json(route);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getRoute = async (req, res) => {
  try {
    const routes = await Route.find({});
    res.status(200).json(routes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRouteById = async (req, res) => {
  try {
    const { routeId } = req.body;
    const route = await Route.findOne({ routeId: routeId });
    if (!route) {
      return res.status(404).json({ message: `Cannot find route with ID ${routeId}` });
    }
    res.status(200).json(route);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateRouteById = async (req, res) => {
  try {
    console.log('params' ,req.params);

    const { routeId } = req.body;
    console.log('routeId' ,routeId);

    const route = await Route.findOneAndUpdate({ routeId: routeId }, req.body, { new: true });
    console.log('route' ,route);
    if (!route) {
      return res.status(404).json({ message: `Cannot find any route with ID ${routeId}` });
    }
    res.status(200).json(route);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteRouteById = async (req, res) => {
  try {
    const { routeId } = req.body;
    const route = await Route.findOneAndDelete(routeId);
    if (!route) {
      return res.status(404).json({ message: `Cannot find any route with ID ${routeId}` });
    }
    res.status(200).json({ message: `Route with ID ${routeId} deleted successfully` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {

  createRoute,
  getRoute,
  getRouteById,
  updateRouteById,
  deleteRouteById,
  
  };
