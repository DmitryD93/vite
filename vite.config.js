import {defineConfig} from "vite";
import {resolve, join, relative} from "path";
import {ViteImageOptimizer} from 'vite-plugin-image-optimizer';
import svgSprite from 'vite-plugin-svg-spriter';
import autoprefixer from "autoprefixer";
import handlebars from 'vite-plugin-handlebars';
import {readdirSync, statSync, existsSync} from 'fs';

// Функция для поиска всех .hbs файлов с сохранением структуры путей
function findHbsPartials() {
    const partialsMap = {};

    function scanDirectory(currentPath, basePath = '') {
        if (!existsSync(currentPath)) return;

        const items = readdirSync(currentPath);
        items.forEach(item => {
            const fullPath = join(currentPath, item);
            const relativePath = join(basePath, item.replace(/\.hbs$/, ''));

            if (statSync(fullPath).isDirectory()) {
                scanDirectory(fullPath, relativePath);
            } else if (item.endsWith('.hbs')) {
                partialsMap[relativePath.replace(/\\/g, '/')] = fullPath;
            }
        });
    }

    // Сканируем только директории с шаблонами
    scanDirectory(resolve(__dirname, 'src/pages'));
    scanDirectory(resolve(__dirname, 'src/partials'));

    return partialsMap;
}

// Упрощенная функция для поиска HTML-файлов (только в корне src/)
function findHtmlInputs() {
    const inputs = {};
    const root = resolve(__dirname, 'src');

    if (!existsSync(root)) return inputs;

    // Собираем все .html файлы в корне src/
    readdirSync(root).forEach(item => {
        if (item.endsWith('.html')) {
            const name = item.replace('.html', '');
            inputs[name] = relative(__dirname, join(root, item)).replace(/\\/g, '/');
        }
    });

    return inputs;
}

// Получаем все partials и HTML-файлы
const hbsPartials = findHbsPartials();
const autoPages = findHtmlInputs();

console.log('Available partials:', Object.keys(hbsPartials));
console.log('HTML inputs:', autoPages);

export default defineConfig({
    root: 'src',
    base: "/vite/",
    resolve: {
        alias: {
            "@": resolve(__dirname, 'src'),
            "@scss": resolve(__dirname, 'src/scss'),
            "@scripts": resolve(__dirname, 'src/scripts'),
            "@modules": resolve(__dirname, 'src/scripts/modules'),
            "@modules-scss": resolve(__dirname, 'src/scss/modules'),
            "@public": resolve(__dirname, 'src/public'),
        }
    },
    css: {
        devSourcemap: true,
        postcss: {
            plugins: [autoprefixer({
                overrideBrowserslist: [
                    'last 2 versions',
                    '> 1%',
                    'IE 10'
                ]
            })]
        }
    },
    plugins: [
        handlebars({
            partialDirectory: [
                'src/partials',
                'src/pages'
            ],
            partials: hbsPartials,
            // Настройки для корректной работы с вложенными partials
            partialOptions: {
                namespaces: {
                    sections: 'src/pages',
                    partials: 'src/partials'
                }
            },
            reloadOnPartialChange: true,
            helpers: {
                // Хелпер для отладки
                log: function (value) {
                    console.log('Handlebars log:', value);
                }
            }
        }),
        {
            name: 'template-update',
            handleHotUpdate({ file, server }) {
                if (file.endsWith(".hbs") || file.endsWith(".html")) {
                    console.log("Reloading template file:", file);
                    server.ws.send({
                        type: "full-reload",
                        path: "*",
                    });
                }
            },
        },
        ViteImageOptimizer({
            jpg: {quality: 75},
            png: {quality: 75}
        }),
        svgSprite({
            svgFolder: resolve(__dirname, 'src/public/img/sprites'),
            svgSpriteConfig: {
                shape: {
                    transform: [{
                        svgo: {
                            plugins: [
                                {name: 'removeAttrs', params: {attrs: '(fill|stroke)'}}
                            ]
                        }
                    }],
                },
            },
        })
    ],
    build: {
        outDir: '../build',
        minify: false,
        emptyOutDir: true,
        cssMinify: false,
        sourcemap: true,
        rollupOptions: {
            input: autoPages,
        },
    },
    server: {
        watch: {
            ignored: ['!**/*.hbs'],
            usePolling: true,
            interval: 100
        },
        hmr: {
            overlay: false
        },

    }
});