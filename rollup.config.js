import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";

import pkg from "./package.json";

const minifyExtension = (pathToFile) => pathToFile.replace(/\.js$/, ".min.js");

export default [
  {
    input: "./",
    output: [
      {
        file: pkg.main,
        format: "cjs",
        exports: "default",
      },
      {
        name: "reqque",
        file: pkg.browser,
        format: "umd",
        exports: "default",
      },
      {
        file: pkg.module,
        format: "es",
        exports: "default",
      },
    ],
    plugins: [
      babel({
        babelHelpers: "bundled",
        exclude: "node_modules/**",
      }),
      json(),
      resolve(),
      commonjs(),
    ],
  },
  {
    input: "./",
    output: [
      {
        file: minifyExtension(pkg.main),
        format: "cjs",
        exports: "default",
      },
      {
        name: "reqque",
        file: minifyExtension(pkg.browser),
        format: "umd",
        exports: "default",
      },
      {
        file: minifyExtension(pkg.module),
        format: "es",
        exports: "default",
      },
    ],
    plugins: [
      babel({
        babelHelpers: "bundled",
        exclude: "node_modules/**",
      }),
      json(),
      resolve(),
      commonjs(),
      terser(),
    ],
  },
];
