import router from './router'
// import {useStore} from "@/store/index"
// @ts-ignore
import store from './store/index.ts'
// @ts-ignore
import NProgress from "nprogress" // 进度条
import 'nprogress/nprogress.css' // 进度条样式
// @ts-ignore
import {getToken} from '@/utils/auth'
import {all, options} from "./api/common";


NProgress.configure({showSpinner: false})

const whiteList = ['/login', '/auth-redirect']

/**
 * 自定义配置不需要请求table配置信息页面
 * */
let arr = ['/login', '/dashboard', '/typePage', '/editPassword', '/userInfo', '/setUp/set/enterpriseDetails']


router.beforeEach(async (to, from, next) => {
    NProgress.start()
    let productPrimaryName = store.getters.productPrimaryName
    if(!productPrimaryName){
        await store.dispatch('system/getSystemMsg')
    }

    const hasToken = getToken()
    if (hasToken) {
        if (to.path === '/login') {
            next({path: '/'})
            NProgress.done()
        } else {
            // 用户访问权限
            // let permissions = store.getters.permissions
            if (!store.getters.permissions) {
                await store.dispatch('common/setoEnumerate')
                await store.dispatch('common/setArrEnumerate')
                await store.dispatch('menus/getMenus')
                await store.dispatch('user/getUserInfo')
                await store.dispatch('system/getSystemUserMsg')
            }
            // 白名单
            if(to.path === '/404'){
                next()
                // next({...to, replace: true})
            }else {
                // console.log(to);
                // console.log(store.getters.meta.code);
                // console.log(to.meta.title);
                if(store.getters.permissions[store.getters.meta.code] && to.meta.title){
                    next()
                }else {
                    next('/404')
                }
            }
            // if(to.path == '/404' && permissions.length == 0)next({...to.redirectedFrom, replace: true})
            // if(to.path == '/404' && permissions.length > 0)next()
            // // 有token，没路由地址，直接跳转首页
            // next({...to, replace: true})
            // next('/')
            NProgress.done()
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next(`/login?redirect=${to.path}`)
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    NProgress.done()
})
