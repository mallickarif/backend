require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const cors = require('cors')
const authMiddleware = require("./middleware/authmiddleware");
const  cookieParser = require("cookie-parser");
var methodOverride = require("method-override")



const vehicleRouter = require("./routes/vehicle.routes.js");
const vendorRouter = require("./routes/vendors.routes.js");
const productRouter = require("./routes/product.routes.js");

app.use("/vehicles", vehicleRouter);
app.use("/vehicle/:id", vendorRouter);
app.use("/", productRouter);

app.use(bodyParser.json());
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"));
app.use(cookieParser());
app.use(methodOverride('_method'))



mongoose.connect("mongodb://127.0.0.1:27017/my_database",
{ useNewUrlParser: true,
useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error",
console.error.bind(console, "MongoDB connection error:"));

const apiRoutes = require("./routes/api.js");
app.use(apiRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is Listening on Port ${PORT}`);
});

app.use(authMiddleware.authenticateToken);
app.use("/protected", authMiddleware.authorizeUser);

app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page not found"));
})

app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});





