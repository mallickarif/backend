const product = require("./models/product.models.js");


const productController = { getAllProduct: async (req, res) => {
          try {
            const product = await product.find();
            res.json(product);
          } catch (err) {
            res.status(500).json({ message: err.message });
          }
},
 getProductById: async (req, res) => {
    try {
        const product = await product.findById(req.params.id);
        if(!product) {
            return res.status (404).json({ message: err.message});
        }
    } catch {
         res.status (404).json({ message: err.message});
    }
 },
 createProduct: async (req, res) => {
    const product = new product({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        vendor: req.body.vendor,
    });
    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
 },
 updateProduct: async (req, res) => {
    try {
        const product = await product.findById( req.params.id);
        if( !product) {
            return res.status(404).json({ message: "vehicle not found" });
        }
        product.name = req.body.name
        product.price = req.body.model;
        product.description  = req.body.description ;
        product.vendor = req.body.vendor;
        const updatedProduct = await vehicle.save();
        res.json(updatedProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
 },
 deleteProduct: async (req, res) => {
    try {
        const product = await product.findById(req.params.id);
        if ( !product) {
            return res.status(404).json({ message: "vehicle not found" });
        }
        await product.remove();
        res.json({ message: "vehicle deleted" })
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
 },
};

module.exports = { productController };