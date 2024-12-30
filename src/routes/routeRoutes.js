const express = require("express");

const { createRouteController,getRouteController,getRouteByIdController, updateRouteByIdController, deleteRouteByIdController} = require("../controllers/routeController");

const router = express.Router();

router.post("/", createRouteController);
router.get("/", getRouteController);
router.get("/:routeId", getRouteByIdController);
router.put("/:routeId", updateRouteByIdController);
router.delete("/:routeId", deleteRouteByIdController);

module.exports = router;