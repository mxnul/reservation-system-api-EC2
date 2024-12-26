const express = require("express");

const { createRouteController,getRouteController,getRouteByIdController, updateRouteByIdController, deleteRouteByIdController} = require("../controllers/routeController");

const router = express.Router();

router.post("/route", createRouteController);
router.get("/route", getRouteController);
router.get("/routeById", getRouteByIdController);
router.put("/route", updateRouteByIdController);
router.delete("/route", deleteRouteByIdController);

module.exports = router;