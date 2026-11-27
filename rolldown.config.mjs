
import { defineConfig } from 'rolldown';

const entries = [
    'quas',
    'quas-debug',
];

export default defineConfig(
    entries.flatMap((name) => [
        // Обычная версия
        {
            input: `src/${name}.js`,
            output: {
                file: `dist/${name}.js`,
                format: 'es',
                minify: false,
                sourcemap: false,
            },
        },

        // Минифицированная версия
        {
            input: `src/${name}.js`,
            output: {
                file: `dist/${name}.min.js`,
                format: 'es',
                minify: true,
                sourcemap: false,
            },
        },

        // Минифицированная версия с Source Map
        {
            input: `src/${name}.js`,
            output: {
                file: `dist/${name}.min.js`,
                format: 'es',
                minify: true,
                sourcemap: true,
            },
        },
    ])
);
