module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",

  // Override default testmatches of jest to skip .js files
  testMatch: ["**/__tests__/**/*.ts?(x)", "**/?(*.)+(spec|test).ts?(x)"],

  verbose: true,
};
