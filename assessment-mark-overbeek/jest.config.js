// jest.config.js (ESModule style)
export default {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "js"],
  testMatch: ["**/src/**/*.test.ts"],
  transform: {
    "^.+\\.ts$": "ts-jest"
  }
};
