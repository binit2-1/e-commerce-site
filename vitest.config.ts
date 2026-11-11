import { configDefaults, defineConfig } from "vitest/config";

// Only this project's tests; the installed agent skills ship their own test files.
export default defineConfig({
  test: { exclude: [...configDefaults.exclude, ".claude/**", ".agents/**", "apps/video/public/**"] },
});
