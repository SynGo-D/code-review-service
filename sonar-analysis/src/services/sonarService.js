const axios = require("axios");

const sonarUrl = process.env.SONAR_URL;
const sonarToken = process.env.SONAR_TOKEN;
const projectKey = process.env.SONAR_PROJECT_KEY;

const sonarClient = axios.create({
  baseURL: sonarUrl,
  auth: {
    username: sonarToken,
    password: "",
  },
});

async function getProjectStatus() {
  const response = await sonarClient.get("/api/qualitygates/project_status", {
    params: {
      projectKey,
    },
  });

  return response.data;
}

async function getIssues() {
  const response = await sonarClient.get("/api/issues/search", {
    params: {
      componentKeys: projectKey,
      ps: 100,
    },
  });

  return response.data;
}

async function getMeasures() {
  const response = await sonarClient.get("/api/measures/component", {
    params: {
      component: projectKey,
      metricKeys:
        "bugs,vulnerabilities,code_smells,coverage,duplicated_lines_density,complexity,cognitive_complexity,sqale_index,sqale_debt_ratio,sqale_rating",
    },
  });

  const measures = response.data.component.measures;

  const metrics = {};

  measures.forEach((measure) => {
    metrics[measure.metric] = Number(measure.value);
  });

  return {
    codeQuality: {
      bugs: metrics.bugs || 0,
      vulnerabilities: metrics.vulnerabilities || 0,
      codeSmells: metrics.code_smells || 0,
      coverage: metrics.coverage || 0,
      duplicatedLinesDensity:
        metrics.duplicated_lines_density || 0,
      complexity: metrics.complexity || 0,
      cognitiveComplexity:
        metrics.cognitive_complexity || 0,
    },

    technicalDebt: {
      sqaleIndex: metrics.sqale_index || 0,
      debtRatio: metrics.sqale_debt_ratio || 0,
      rating: metrics.sqale_rating || 0,
    },
  };
}

async function getTechnicalDebt() {
  const data = await getMeasures();

  return data.technicalDebt;
}

async function getAnalysis() {
  const [status, issues, measures] = await Promise.all([
    getProjectStatus(),
    getIssues(),
    getMeasures(),
  ]);

  return {
    project: {
      key: response.data.component.key,
      name: response.data.component.name,
    },

    qualityGate: {
      status: status.projectStatus.status,
      compliant: status.projectStatus.status === "OK",
    },

    technicalDebt: measures.technicalDebt,

    codeQuality: measures.codeQuality,

    issues: {
      total: issues.total,
      effortTotal: issues.effortTotal,
      items: issues.issues,
    },
  };
}

module.exports = {
  getProjectStatus,
  getIssues,
  getMeasures,
  getTechnicalDebt,
  getAnalysis,
};