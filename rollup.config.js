import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from "rollup-plugin-terser";
import autoExternal from 'rollup-plugin-auto-external';
import replace from 'rollup-plugin-replace';

const config = {
  plugins: [
    autoExternal(),
    replace({ NODE_ENV: process.env.API_KEY }),
    resolve({ extensions: ['.ts', '.js'] }),
    babel({ extensions: ['.ts'], exclude: 'node_modules/**', runtimeHelpers: true }),
    terser(),
  ]
};

export default [{
  input: 'src/IFramyParent.ts',
  output: {
    file: './parent.js',
    format: 'umd',
    name: 'iframy',
    sourcemap: process.env.NODE_ENV === 'dev',
  },
  ...config,
}, {
  input: 'src/IFramyChild.ts',
  output: {
    file: './child.js',
    format: 'umd',
    name: 'iframy',
    sourcemap: process.env.NODE_ENV === 'dev',
  },
  ...config,
}];
