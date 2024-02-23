const vehicle = require("./models/vehicle.models.js");

const vehicleController = { getAllVehicles: async (req, res) => {
          try {
            const vehicles = await vehicle.find();
            res.json(vehicles);
          } catch (err) {
            res.status(500).json({ message: err.message });
          }
},
 getVehicleById: async (req, res) => {
    try {
        const vehicle = await vehicle.findById(req.params.id);
        if(!vehicle) {
            return res.status (404).json({ message: err.message});
        }
    } catch {
         res.status (404).json({ message: err.message});
    }
 },
 createVehicle: async (req, res) => {
    const vehicle = new Vehicle({
        make: req.body.make,
        model: req.body.model,
        year: req.body.year,
        vendor: req.body.vendor,
    });
    try {
        const newVehicle = await vehicle.save();
        res.status(201).json(newVehicle);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
 },
 updateVehicle: async (req, res) => {
    try {
        const vehicle = await Vehicle.findById( req.params.id);
        if( !vehicle) {
            return res.status(404).json({ message: "vehicle not found" });
        }
        vehicle.make = req.body.make
        vehicle.model = req.body.model;
        vehicle.year = req.body.year;
        vehicle.vendor = req.body.vendor;
        const updatedVehicle = await vehicle.save();
        res.json(updatedVehicle);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
 },
 deleteVehicle: async (req, res) => {
    try {
        const vehicle = await vehicle.findById(req.params.id);
        if ( !vehicle) {
            return res.status(404).json({ message: "vehicle not found" });
        }
        await vehicle.remove();
        res.json({ message: "vehicle deleted" })
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
 },
};

module.exports = { vehicleController };