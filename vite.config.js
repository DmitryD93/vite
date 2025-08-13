import {defineConfig} from "vite";
import {resolve, join, relative} from "path";
import {ViteImageOptimizer} from 'vite-plugin-image-optimizer';
import svgSprite from 'vite-plugin-svg-spriter';
import autoprefixer from "autoprefixer";
import handlebars from 'vite-plugin-handlebars';
import {readdirSync, statSync, existsSync} from 'fs';



// Автоматическое определение директории с шаблонами hbs

function findHbsDirectories() {
    const hbsDirs = new Set();

    // Сканируем pages
    function scanPagesDirectory(currentPath = 'src/pages') {
        if (!existsSync(resolve(__dirname, currentPath))) return;

        const items = readdirSync(resolve(__dirname, currentPath));

        items.forEach(item => {
            const fullPath = join(currentPath, item);
            const absPath = resolve(__dirname, fullPath);

            if (statSync(absPath).isDirectory()) {
                // Добавляем с префиксом 'src/'
                hbsDirs.add('src/' + relative(resolve(__dirname, 'src'), absPath));
                scanPagesDirectory(fullPath);
            }
        });
    }

    function scanPartialsDirectory(currentPath = 'src/partials') {
        if (!existsSync(resolve(__dirname, currentPath))) return;

        const items = readdirSync(resolve(__dirname, currentPath));

        items.forEach(item => {
            const fullPath = join(currentPath, item);
            const absPath = resolve(__dirname, fullPath);

            if (statSync(absPath).isDirectory()) {
                // Добавляем с префиксом 'src/'
                hbsDirs.add('src/' + relative(resolve(__dirname, 'src'), absPath));
                scanPartialsDirectory(fullPath);
            }
        });
    }

    // Запускаем сканирование
    scanPagesDirectory();
    scanPartialsDirectory();

    return Array.from(hbsDirs).map(dir => dir.replace(/\\/g, '/'));
}

// Для автодобавления путей в билд

function findHtmlInputs(basePath = 'src/pages') {
    const inputs = {};

    function scanDirectory(currentPath, baseName = '') {
        if (!existsSync(currentPath)) return;

        const items = readdirSync(currentPath);

        items.forEach(item => {
            const fullPath = join(currentPath, item);
            const isDirectory = statSync(fullPath).isDirectory();

            if (isDirectory) {
                // Рекурсивно сканируем подпапки
                scanDirectory(fullPath, baseName ? `${baseName}/${item}` : item);
            } else if (item === 'index.html') {
                // Формируем ключ на основе пути
                const key = baseName || 'main';
                // Возвращаем относительный путь от корня проекта
                inputs[key] = relative(resolve(__dirname), fullPath)
                    .replace(/\\/g, '/'); // Нормализуем разделители
            }
        });
    }

    // Главная страница
    if (existsSync(resolve(__dirname, 'src/index.html'))) {
        inputs['main'] = 'src/index.html'; // Относительный путь
    }

    // Сканируем pages
    scanDirectory(resolve(__dirname, basePath));

    return inputs;
}


// обновление страницы при изменении handlebar файлов
function HandlebarUpdate() {
    return {
        name: "HandlebarUpdate",
        enforce: "post",
        handleHotUpdate({ file, server }) {
            if (file.endsWith(".hbs")) {
                console.log("reloading handlebar file...");
                server.ws.send({
                    type: "full-reload",
                    path: "*",
                });
            }
        },
    };
}


// Переменные к функциям
const autoHbsDirs = findHbsDirectories();
const autoPages = findHtmlInputs();


const partDirs = [
    'src/partials',
    ...autoHbsDirs
];


// console.log('Origin:', partDirs);
// console.log('For automation:', autoPages);
export default defineConfig({
    root: 'src',
    base: "/vite/",
    // publicDir: resolve(__dirname, '../public'),
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
        postcss: {
            plugins: [autoprefixer(
                {
                    overrideBrowserslist: [
                        'last 2 versions',
                        '> 1%',
                        'IE 10'
                    ]
                }
            )]
        }
    },

    plugins: [
        handlebars({
            // context(pagePath) {
            //     return pageData[pagePath];
            // },
            partialDirectory: partDirs, // шаблоны как header и footer
            reloadOnPartialChange: true,
            reload: true,
            refresh: true,

        }),
        {
            handleHotUpdate({ file, server }) {
                if (file.endsWith(".hbs")) {
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
            svgFolder: resolve(__dirname, 'src/public/img/sprites'), // папка с иконками для обработки
            svgSpriteConfig: {
                // transformIndexHtmlTag: {
                //     injectTo: 'body', // вставить в body
                // },
                shape: {
                    transform: [
                        {
                            svgo: {
                                plugins: [
                                    {name: 'removeAttrs', params: {attrs: '(fill|stroke)'}} // удалить атрибуты fill и stroke
                                ]
                            }
                        }
                    ],
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
        },
    }

    // test: {
    //     globals: true,
    //     environment: "jsdom",
    //     coverage: {
    //         exclude: ["node_modules/"],
    //     },
    // }

});

