// Flat config for Next.js 16+ — uses the native flat configs shipped by
// eslint-config-next (no FlatCompat bridge needed).
// "core-web-vitals" already includes the base TypeScript + React rules.
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = [
  ...nextCoreWebVitals,
  {
    ignores: [".next/**", "node_modules/**", "out/**", "build/**"],
  },
];

export default eslintConfig;
