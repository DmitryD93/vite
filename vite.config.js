import {defineConfig} from "vite";
import {resolve} from "path";
import {ViteImageOptimizer} from 'vite-plugin-image-optimizer';
import createSVGSpritePlugin from "vite-plugin-svg-spriter";

const FRONT_PATH = 'src';


export default defineConfig({
    root: 'src',

    plugins: [
        ViteImageOptimizer({
            jpg: {
                quality: 75
            },
            png: {
                quality: 75
            }
        }),
        createSVGSpritePlugin({
            svgFolder: `${FRONT_PATH}/assets/images/svg/`
        }),
    ],
    build: {
        minify: false,
        cssMinify: false,
        sourcemap: true,
        // minifyCSS: 'lightningcss',
        rollupOptions: {
            input: {
                index: resolve(`${FRONT_PATH}/index.html`),
                about: resolve(__dirname, `${FRONT_PATH}/html/pages/about/index.html`),
                contacts: resolve(__dirname, `${FRONT_PATH}/html/pages/contacts/index.html`),
            },
        },
    },
})
