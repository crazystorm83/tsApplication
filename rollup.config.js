
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from '@rollup/plugin-babel';
import typescript from "rollup-plugin-typescript2";

const packageJson = require("./package.json");
const extentions = ["js", "jsx", "ts", "tsx", "json"];
const external = ["react", "react-dom", "styled-components"];

process.env.BABEL_ENV = "production";

export default [
    {
        input: "./src/App.ts",
        output: {
            name: "ECount",
            file: "dist/ecount.sdk.umd.js",
            format: "umd",
            sourcemap: true,
        },
        plugins: [
            resolve({ extentions }),
            babel({
                extentions,
                include: ['src/**/*'],
                exclude: /node_modules/,
                babelHelpers: 'runtime',
            }),
            commonjs(),
            typescript({ 
                tsconfig: "tsconfig.json"
            })
        ],
        external
    }
]