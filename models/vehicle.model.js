const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const vehicleSchema = new Schema(
    {
        make: {
            type: String,
            required: true,
        },
        model: {
            type: String,
            required: true,
        },
        year: {
            type: Number,
            required: true,
        },
        price: {
            type: String,
            required: true,
        },
        vendor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Vendor",
        }
    }, { timestamps: true }
    )

    vehicleSchema.pre("save", async function (next) {
        if(!this.isModified("password")) return next()
        this.password = bcrypt.hash(this.password, 10)
    next()
    })

    vehicleSchema.methods.isPasswordCorrect = async function
    (password){
        return await bcrypt.compare(password, this.password)
    }

    vehicleSchema.methods.generateRefreshToken = function() {
        return jwt.sign(
            {
                 _id: this._id,
                 model: this.model,
                 year: this.year,
                 price: this.price,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
        )
    }

    vehicleSchema.methods.generateRefreshToken = function() {
        return jwt.sign(
            {
                 _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
        )
    }

export const Vehicle = mongoose.model("Vehicle", vehicleSchema);