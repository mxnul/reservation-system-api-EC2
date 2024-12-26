const Route = require("../models/routeModel");
const { createRoute,getRoute,getRouteById, updateRouteById, deleteRouteById,} = require("../services/routeService");

// app.post('/route', async (req, res) => {
//   try {
//     const existingRoute = await Route.findOne({ routeId: req.body.routeId });
//     if (existingRoute) {
//       return res.status(400).json({ message: "Route ID already exists" });
//     }
//     const route = await Route.create(req.body);
//     res.status(201).json(route);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

const createRouteController = async(req, res) => {
  // try {
  //   const existingRoute = await Route.findOne({ routeId: req.body.routeId });
  //   if (existingRoute) {
  //     return res.status(400).json({ message: "Route ID already exists" });
  //   }
  //   const route = await Route.create(req.body);
  //   res.status(201).json(route);
  // } catch (error) {
  //   res.status(500).json({ message: error.message });
  // }
  return createRoute(req, res);
};


const getRouteController = async (req, res) => {
  // try {
  //   const routes = await Route.find({});
  //   res.status(200).json(routes);
  // } catch (error) {
  //   res.status(500).json({ message: error.message });
  // }
  return getRoute(req, res);
};

const getRouteByIdController = async (req, res) => {
  // try {
  //   const { id } = req.params;
  //   const route = await Route.findById(id);
  //   if (!route) {
  //     return res.status(404).json({ message: `Cannot find route with ID ${id}` });
  //   }
  //   res.status(200).json(route);
  // } catch (error) {
  //   res.status(500).json({ message: error.message });
  // }
  return getRouteById(req, res);
};

const updateRouteByIdController = async (req, res) => {
  // try {
  //   const { id } = req.params;
  //   const route = await Route.findByIdAndUpdate(id, req.body, { new: true });
  //   if (!route) {
  //     return res.status(404).json({ message: `Cannot find any route with ID ${id}` });
  //   }
  //   res.status(200).json(route);
  // } catch (error) {
  //   res.status(500).json({ message: error.message });
  // }
  return updateRouteById(req, res);
};

const deleteRouteByIdController = async (req, res) => {
  // try {
  //   const { id } = req.params;
  //   const route = await Route.findByIdAndDelete(id);
  //   if (!route) {
  //     return res.status(404).json({ message: `Cannot find any route with ID ${id}` });
  //   }
  //   res.status(200).json({ message: `Route with ID ${id} deleted successfully` });
  // } catch (error) {
  //   res.status(500).json({ message: error.message });
  // }
  return deleteRouteById(req, res);
};

module.exports = {

  createRouteController,
  getRouteController,
  getRouteByIdController,
  updateRouteByIdController,
  deleteRouteByIdController,
  
  };
