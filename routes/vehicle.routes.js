const express = require("express");
const router = express.Router();
const Vehicle = require("../models/vehicle.model.js")
const vehicleController = require("../controllers/vehicles.js");


router.get("/vehicles", vehicleController.getAllVehicle);
router.get("/vehicles/:id", vehicleController.getVehicleById);
router.post("/vehicles", vehicleController.createVehicle);
router.put("/vehicles/:id", vehicleController.updateVehicle);
router.delete("/vehicles/:id", vehicleController.deleteVehicle);