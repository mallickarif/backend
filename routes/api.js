const express = require("express");
const router = express.Router();
const { vehicleController, vendorController, productController} = require("./controllers");

router.post("/api/collectVehicleInfo", vehicleController.collectVehicleInfo);
router.get("/api/vendors/:id", vendorController.getVendorById);
router.get("/api/products/:poNumber", productController.getProductByPoNumber);

module.exports = router;