import { defineConfig } from 'rolldown';

// Сборка для подключения обычным <script src="..."> (CDN jsDelivr и т.п.).
// format: 'iife' — НЕ 'es': ES-модуль с `export default` нельзя загрузить классическим <script>,
// браузер падает с "Unexpected token 'export'".
const entries = ['quas', 'quas-debug'];

const base = { format: 'iife', name: undefined };

export default defineConfig(
    entries.flatMap((name) => [
        // Обычная версия
        {
            input: `src/${name}.js`,
            output: { ...base, file: `dist/${name}.js`, minify: false, sourcemap: false },
        },
        // Минифицированная версия + Source Map
        {
            input: `src/${name}.js`,
            output: { ...base, file: `dist/${name}.min.js`, minify: true, sourcemap: true },
        },
    ])
);
