    const express = require("express");
    const cors = require("cors");
    const dotenv = require("dotenv");

    const sonarRoutes = require("./routes/sonarRoutes");

    const app = express();

    app.use(cors());
    app.use(express.json());

    app.get("/health", (req, res) => {
    res.json({
        status: "UP",
        service: "sonar-analysis",
    });
    });

    app.use("/api/sonar", sonarRoutes);

    module.exports = app;