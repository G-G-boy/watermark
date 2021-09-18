import typescript from '@rollup/plugin-typescript';
import {defineConfig} from 'rollup';
import {terser} from 'rollup-plugin-terser';

export default defineConfig({
    input: 'src/index.ts',
    output: [
        {
            file: 'dist/index.cjs',
            format: 'cjs',
            exports: 'default',
        },
        {
            file: 'dist/index.js',
            format: 'esm',
        },
    ],
    plugins: [typescript({tsconfig: './tsconfig.json'}), terser()],
});
