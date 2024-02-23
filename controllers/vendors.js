const vendor = require("./models/vendor.models.js");


const  vendorController = { getAllVendor: async (req, res) => {
          try {
            const vendor = await  vendor.find();
            res.json(vendor);
          } catch (err) {
            res.status(500).json({ message: err.message });
          }
},
 getVendorById: async (req, res) => {
    try {
        const vendor = await vendor.findById(req.params.id);
        if(!vendor) {
            return res.status (404).json({ message: err.message});
        }
    } catch {
         res.status (404).json({ message: err.message});
    }
 },
 createVendor: async (req, res) => {
    const  vendor = new  vendor({
        name: req.body.name,
        location: req.body.location,
        contact: req.body.contact,
        vendor: req.body.vendor,
    });
    try {
        const newVendor = await  vendor.save();
        res.status(201).json(newVendor);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
 },
 updateVendor: async (req, res) => {
    try {
        const vendor = await vendor.findById( req.params.id);
        if( !vendor) {
            return res.status(404).json({ message: "vehicle not found" });
        }
        vendor.name = req.body.name
        vendor.location = req.body.location;
        vendor.contact = req.body.contact;
        vendor.vendor = req.body.vendor;
        const updatedvendor = await vendor.save();
        res.json(updatedVendor);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
 },
 deleteVendor: async (req, res) => {
    try {
        const  vendor = await vendor.findById(req.params.id);
        if ( !vendor) {
            return res.status(404).json({ message: "vendor not found" });
        }
        await vendor.remove();
        res.json({ message: "vendor deleted" })
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
 },
};

module.exports = {  vendorController };