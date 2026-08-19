require("dotenv").config({
  path: "../.env",
});

console.log("SONAR_URL:", process.env.SONAR_URL);
console.log(
  "SONAR_TOKEN:",
  process.env.SONAR_TOKEN ? "Loaded" : "Missing"
);
console.log("SONAR_PROJECT_KEY:", process.env.SONAR_PROJECT_KEY);

const express = require("express");
const cors = require("cors");

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

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Sonar Analysis Service running on port ${PORT}`);
});