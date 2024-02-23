const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const vendorSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        contact: {
            type: String,
            required: true,
        },
    }, { timestamps: true }
    );

    vendorSchema.pre("save", async function (next) {
        if(!this.isModified("password")) return next()
        this.password = bcrypt.hash(this.password, 10)
    next()
    })

    vendorSchema.methods.isPasswordCorrect = async function
    (password){
        return await bcrypt.compare(password, this.password)
    }

    vendorSchema.methods.generateRefreshToken = function() {
        return jwt.sign(
            {
                 _id: this._id,
                 email: this.email,
                 username: this.username,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
        )
    }

    vendorSchema.methods.generateRefreshToken = function() {
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
export const Vendor = mongoose.model("Vendor", vendorSchema);