const express = require("express");

const {
  getProjectStatus,
  getIssues,
  getMeasures,
  getTechnicalDebt,
} = require("../services/sonarService");

const router = express.Router();

router.get("/status", async (req, res) => {
  try {
    const data = await getProjectStatus();

    res.json(data);
  } catch (error) {
    console.error("SonarQube status error:", error.message);

    res.status(500).json({
      error: "Failed to retrieve SonarQube project status",
    });
  }
});

router.get("/issues", async (req, res) => {
  try {
    const data = await getIssues();

    res.json(data);
  } catch (error) {
    console.error("SonarQube issues error:", error.message);

    res.status(500).json({
      error: "Failed to retrieve SonarQube issues",
    });
  }
});

router.get("/measures", async (req, res) => {
  try {
    const data = await getMeasures();

    res.json(data);
  } catch (error) {
    console.error("SonarQube measures error:", error.message);

    res.status(500).json({
      error: "Failed to retrieve SonarQube measures",
    });
  }
});

router.get("/technical-debt", async (req, res) => {
  try {
    const data = await getTechnicalDebt();

    res.json(data);
  } catch (error) {
    console.error(
      "SonarQube technical debt error:",
      error.message
    );

    res.status(500).json({
      error: "Failed to retrieve technical debt",
    });
  }
});

module.exports = router;