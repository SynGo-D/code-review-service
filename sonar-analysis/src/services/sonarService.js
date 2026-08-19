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

  return response.data;
}

module.exports = {
  getProjectStatus,
  getIssues,
  getMeasures,
};