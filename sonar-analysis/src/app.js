    const express = require("express");
    const cors = require("cors");
    const dotenv = require("dotenv");

    dotenv.config({ path: "../.env" });

    const app = express();

    app.use(cors());
    app.use(express.json());

    app.get("/health", (req, res) => {
    res.json({
        status: "UP",
        service: "sonar-analysis",
    });
    });

    const PORT = process.env.SONAR_ANALYSIS_PORT || 5001;

    app.listen(PORT, () => {
    console.log(`Sonar Analysis Service running on port ${PORT}`);
    });