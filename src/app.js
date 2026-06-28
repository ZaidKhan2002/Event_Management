require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();


app.use(cors());
app.use(express.json());


const userRoutes = require("./routes/userRoute");
const eventRoutes = require("./routes/eventRoute");

app.use("/api", userRoutes);
app.use("/api", eventRoutes);

app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is running"
    });
});


app.use((err, req, res, next) => {
    console.error(err);

    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
});

module.exports = app;