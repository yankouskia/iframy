import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import { uglify } from 'rollup-plugin-uglify';
import autoExternal from 'rollup-plugin-auto-external';
import replace from 'rollup-plugin-replace';

const config = {
  plugins: [
    autoExternal(),
    replace({ NODE_ENV: process.env.API_KEY }),
    resolve(),
    babel({ exclude: 'node_modules/**' }),
    uglify(),
  ]
};

export default [{
  input: 'src/parent.js',
  output: {
    file: './dist/parent.js',
    format: 'umd',
    name: 'parentFramy',
  },
  ...config,
}, {
  input: 'src/child.js',
  output: {
    file: './dist/child.js',
    format: 'umd',
    name: 'childFramy',
  },
  ...config,
}];
