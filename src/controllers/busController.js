const {
  createBus,
  getAllBuses,
  getBusById,
  updateBusById,
  deleteBusById,
} = require("../services/busService");

const Bus = require("../models/busModel");

const createBusController = async (req, res) => {
  await createBus(req, res);
};

const getAllBusesController = async (req, res) => {
  await getAllBuses(req, res);
};

const getBusByIdController = async (req, res) => {
  await getBusById(req, res);
};

const updateBusByIdController = async (req, res) => {
  await updateBusById(req, res);
};

const deleteBusByIdController = async (req, res) => {
  await deleteBusById(req, res);
};

module.exports = {
  createBusController,
  getAllBusesController,
  getBusByIdController,
  updateBusByIdController,
  deleteBusByIdController,
};
