import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    globals: true,
    include: ["__tests__/**/*.test.ts"],
    typecheck: { tsconfig: "./tsconfig.test.json" },
    isolate: true,
  },
});
