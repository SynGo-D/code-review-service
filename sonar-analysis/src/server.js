require("dotenv").config({
  path: "../.env",
});

console.log("SONAR_URL:", process.env.SONAR_URL);
console.log(
  "SONAR_TOKEN:",
  process.env.SONAR_TOKEN ? "Loaded" : "Missing"
);
console.log("SONAR_PROJECT_KEY:", process.env.SONAR_PROJECT_KEY);

const app = require("./app");

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Sonar Analysis Service running on port ${PORT}`);
});