const mongoose = require("mongoose");

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        price: {
            type: String,
            required: true,
        },
        description : {
            type: String,
            required: true,
        },
        vendor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Vendor",
        },
    }, { timestamps: true }
    );

export const Product = mongoose.model("Product", productSchema);