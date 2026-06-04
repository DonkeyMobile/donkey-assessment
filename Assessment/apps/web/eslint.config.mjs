import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";
import reactYouMightNotNeedAnEffect from "eslint-plugin-react-you-might-not-need-an-effect";

const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypeScript,
  reactYouMightNotNeedAnEffect.configs.recommended,
  {
    ignores: [".next/*", "node_modules/*", "e2e/*", "test/*"],
  },
  {
    rules: {
      curly: ["error", "all"],
    },
  },
];

export default eslintConfig;
