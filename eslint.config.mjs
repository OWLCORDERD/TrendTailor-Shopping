import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

// 2026.10.17: Next.js 16 `next lint` 제거에 따른 ESLint Flat Config 마이그레이션
// (기존 .eslintrc.json의 "next/core-web-vitals" 대체)
const eslintConfig = defineConfig([
  ...nextVitals,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts", ".agents/**", ".claude/**"]),
]);

export default eslintConfig;
