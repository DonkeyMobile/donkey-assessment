export default {
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  preset: "@shelf/jest-mongodb",
  testEnvironment: "node",
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};
