import { createApp } from "vue"
import App from './App.vue'
import router from "./router/index"
// import ElementPlus from '@/element-plus/dist/index.full.mjs'
import ElementPlus from 'element-plus'
import store from './store/index'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import './styles/index.scss'
import "./permission"
import './assets/font/iconfont.js';
import './utils/globalProperties.ts'
import './utils/pureComponents.tsx'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)


for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}


app.use(router)
app.use(store)
app.use(ElementPlus,{locale: zhCn})
app.mount('#app')

export default app
