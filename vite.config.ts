// @ts-ignore
import path from 'path'
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// import Inspect from 'vite-plugin-inspect'

const resolve = path.resolve(__dirname, 'src')

export default defineConfig(({ command, mode }) => {
    if (command === 'serve') {
        // dev 独有配置
        return {
            server:{
                port: '9527',
                hmr:{
                    overlay: true    // 默认是 true，设置为false后报错不会在以vite的形式在页面显示了
                },
                proxy: {
                    "/api": {
                        // target: 'http://139.224.164.121:9527/api',         // 生产环境地址
                        // target: 'http://192.168.1.46:6601',         // 张婧本
                        // target: 'http://192.168.1.86:6601',         // 郑阳本
                        // target: 'http://106.14.217.246:9527/api',   // 线上信息平台
                        // target: 'http://47.116.109.205:9527/api',   // 线上湖北平台
                        target: 'http://59.175.148.195:6601',    // 测试环境
                        changeOrigin: true,
                        rewrite: (path) => path.replace(/^\/api/, ""),
                    },
                }
            },
            define: {
                'process.env': {
                    VUE_APP_BASE_API: "",
                    MODE: mode
                }
            },
            base: './',
            resolve: {
                alias: {
                    '@': resolve,
                },
            },
            // css: {
            //     preprocessorOptions: {
            //         scss: {
            //             additionalData: `@use "@/styles/element/index.scss" as *;`,
            //         },
            //     },
            // },
            esbuild: {
                jsxFactory: 'h',
                jsxFragment: 'Fragment'
            },
            plugins: [
                vue({
                    reactivityTransform: true,
                }),
                vueJsx({
                    // options are passed on to @vue/babel-plugin-jsx
                }),
                AutoImport({
                    imports: ['vue', 'vue/macros', 'vue-router', '@vueuse/core', 'vuex'],
                    dts: 'src/atuoFlies/auto-imports.d.ts',
                    resolvers: [
                        // 自动导入图标组件
                        IconsResolver({
                            prefix: 'Icon',
                        }),
                        ElementPlusResolver()
                    ],
                }),
                Components({
                    dirs: ['@/element-plus/es/components', 'src/components'],
                    dts: 'src/atuoFlies/components.d.ts',
                    resolvers: [
                        // 自动注册图标组件
                        IconsResolver({
                            enabledCollections: ['ep'],
                        }),
                        // 自动导入 Element Plus 组件
                        ElementPlusResolver(),
                    ],
                }),
                Icons({
                    autoInstall: true,
                }),
                // Inspect(),  // 页面流程分析图（会直接影响启动速度）
            ],
            // build: {
            //     // 在 outDir 中生成 manifest.json
            //     manifest: true,
            //     rollupOptions: {
            //         // 覆盖默认的 .html 入口
            //         input: '/path/to/main.js'
            //     }
            // }
        }
    } else {
        // command === 'build'
        return {
            // build 独有配置
            server:{
                hmr:{
                    overlay: true    // 默认是 true，设置为false后报错不会在以vite的形式在页面显示了
                }
            },
            define: {
                'process.env': {
                    VUE_APP_BASE_API: ""
                }
            },
            base: './',
            resolve: {
                alias: {
                    '@': resolve,
                },
            },
            // css: {
            //     preprocessorOptions: {
            //         scss: {
            //             additionalData: `@use "@/styles/element/index.scss" as *;`,
            //         },
            //     },
            // },
            esbuild: {
                jsxFactory: 'h',
                jsxFragment: 'Fragment',
                drop: command === 'build' ? ['console', 'debugger'] : []
            },
            plugins: [
                vue({
                    reactivityTransform: true,
                }),
                vueJsx({
                    // options are passed on to @vue/babel-plugin-jsx
                }),
                AutoImport({
                    imports: ['vue', 'vue-router', '@vueuse/core', 'vuex'],
                    dts: 'src/atuoFlies/auto-imports.d.ts',
                    resolvers: [
                        // 自动导入图标组件
                        IconsResolver({
                            prefix: 'Icon',
                        }),
                        ElementPlusResolver()
                    ],
                }),
                Components({
                    dts: 'src/atuoFlies/components.d.ts',
                    resolvers: [
                        // 自动注册图标组件
                        IconsResolver({
                            enabledCollections: ['ep'],
                        }),
                        // 自动导入 Element Plus 组件
                        ElementPlusResolver(),
                    ],
                }),
                Icons({
                    autoInstall: true,
                }),
            ],
        }
    }
})
