module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["./src/setupTests.js"],
  moduleNameMapper: {
    "\\.(css|less)$": "<rootDir>/src/__mocks__/styleMock.js"
  }
};
