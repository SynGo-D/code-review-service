const express = require("express");

const {
  getProjectStatus,
  getIssues,
  getMeasures,
  getTechnicalDebt,
  getAnalysis,
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

router.get("/analysis", async (req, res) => {
  try {
    const data = await getAnalysis();

    res.json(data);
  } catch (error) {
    console.error(
      "SonarQube analysis error:",
      error.message
    );

    res.status(500).json({
      error: "Failed to retrieve SonarQube analysis",
    });
  }
});

router.get("/dashboard", async (req, res) => {
  try {
    const [projectStatus, measures, issues] = await Promise.all([
      getProjectStatus(),
      getMeasures(),
      getIssues(),
    ]);

    const technicalDebtHours =
      measures.technicalDebt.sqaleIndex / 60;

    res.json({
      project: {
        key: process.env.SONAR_PROJECT_KEY,
      },

      qualityGate: {
        status: projectStatus.projectStatus.status,
        compliant:
          projectStatus.projectStatus.status === "OK",
      },

      summary: {
        bugs: measures.codeQuality.bugs,
        vulnerabilities: measures.codeQuality.vulnerabilities,
        codeSmells: measures.codeQuality.codeSmells,
        coverage: measures.codeQuality.coverage,
      },

      technicalDebt: {
        minutes: measures.technicalDebt.sqaleIndex,
        hours: Number(technicalDebtHours.toFixed(2)),
        debtRatio: measures.technicalDebt.debtRatio,
        rating: measures.technicalDebt.rating,
      },

      complexity: {
        complexity: measures.codeQuality.complexity,
        cognitiveComplexity:
          measures.codeQuality.cognitiveComplexity,
      },

      duplication: {
        percentage:
          measures.codeQuality.duplicatedLinesDensity,
      },

      issues: {
        total: issues.total,
      },
    });
  } catch (error) {
    console.error(
      "SonarQube dashboard error:",
      error.message
    );

    res.status(500).json({
      error: "Failed to retrieve dashboard data",
    });
  }
});

module.exports = router;