const express = require("express");
const {
  createBusController,
  getAllBusesController,
  getBusByIdController,
  updateBusByIdController,
  deleteBusByIdController,
} = require("../controllers/busController");

const router = express.Router();

router.post("/", createBusController);
router.get("/", getAllBusesController);
router.get("/:busId", getBusByIdController);
router.put("/:busId", updateBusByIdController);
router.delete("/:busId", deleteBusByIdController);

module.exports = router;
