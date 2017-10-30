import alias from 'rollup-plugin-alias';
import typescript from 'rollup-plugin-typescript';
import resolve from 'rollup-plugin-node-resolve';

export default {
    input: 'src/rollup_vendor.ts',
    output: {
        file: 'wwwroot/rollup/vendor.es2015.js',
        format: 'iife'
    },
    name: 'vendor',
    plugins: [
        typescript(),
        alias({ rxjs: __dirname + '/node_modules/rxjs-es' }),
        resolve({
            jsnext: true,
            main: true,
            browser: true
        }),
    ]
}