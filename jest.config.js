process.env.UPLOAD_DIR = "./tmp/uploads";

export default {
  preset: "ts-jest/presets/default-esm",
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  setupFilesAfterEnv: ["./src/test/setup.ts"],
};
