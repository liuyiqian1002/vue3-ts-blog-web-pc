// @ts-ignore
import {getTree} from '@/api/common.ts'
// @ts-ignore
import router from '@/router'
import {getWebMenus} from "../../api/system";

const state = {
    menus: [],
    isCollapse: false,
    systemMenus: [],
    meta:{}
}

const mutations = {
    SET_MENUS: (state: any, data: void) => {
        state.menus = data
    },
    SET_ISCOLLAPSE: (state: any, isCollapse: boolean) => {
        state.isCollapse = isCollapse
    },
    SET_SYSTEMMENUS: (state: any, systemMenus: void) => {
        state.systemMenus = systemMenus
    },
    SET_META: (state: any, item: any) => {
        state.meta = item
    }
}

const actions = {
    // 获取菜单数据
    getMenus({commit}: any, permissions: any) {
        return new Promise((resolve,reject)=>{
            getTree({type: 1}).then((res)=>{
                // let data = JSON.parse(JSON.stringify(res[0].children[4].children))
                // commit('SET_SYSTEMMENUS', data)
                // let lists = res[0].children,arr = []
                // for (let i = 0; i < lists.length; i++) {
                //     lists[i].children = []
                //     arr.push(lists[i])
                // }
                // commit('SET_MENUS', arr)
                if(res[0]){
                    commit('SET_META', res[0].children[0].meta)
                    commit('SET_MENUS', res[0].children)
                    // router.push(res[0].children[0].path)
                    resolve(res[0].children)
                }else {
                    router.push('/404')
                }
            })

        })
        // let menus = ['index', 'activeSafety', 'watch', 'statistics', 'operation', 'setting']
        // let menusObj = {
        //     index: {name: 'Homes', title: '首页概况', meta: {title: '首页概况', name: 'Home', icon: 'shouye'}, path: '/'},
        //     activeSafety: {name: 'activeSafety', title: '大屏互动', meta: {title: '大屏互动', name: 'dapingdongtai', icon: 'shouye'}, path: '/'},
        //     watch: {name: 'watch', title: '动态监测', meta: {title: '动态监测', name: 'watch', icon: 'dongtaijiance'}, path: '/'},
        //     statistics: {name: 'Homes', title: '统计报表', meta: {title: '统计报表', name: 'Home', icon: 'tongjibaobiao'}, path: '/'},
        //     operation: {name: 'operation', title: '运营管理', meta: {title: '运营管理', name: 'operation', icon: 'yinyungguanli'}, path: '/'},
        //     setting: {name: 'setting', title: '系统管理', meta: {title: '系统管理', name: 'setting', icon: 'xitongguanli', activeMenu: '/system'}, path: '/system/management/menus'}
        // }
    },
    // 菜单显示状态
    setIsCollapse({commit}: any, status: boolean) {
        commit('SET_ISCOLLAPSE', status)
    },
    // 菜单显示状态
    setMeta({commit}: any, item: any) {
        commit('SET_META', item)
    }
}

import Layout from '@/layout/index.vue'

/**
 * 请不要随便更改当前代码
 * */
const routerPackag = (routers: any[]) => {
    routers.filter((itemRouter) => {
        if (itemRouter.component != 'layout') {
            if (['', '/'].includes(itemRouter.path)) {
                itemRouter['component'] = () => import('@/pages/home/index.vue')
            } else {
                itemRouter['component'] = () => import(`../../pages${itemRouter.path}/index.vue`)
            }
        } else {
            itemRouter['component'] = Layout
        }
        if (itemRouter.level == 1) {
            router.addRoute(itemRouter)
        } else {
            router.addRoute(itemRouter.parentId, itemRouter)
        }
        if (itemRouter.children && itemRouter.children.length) {
            routerPackag(itemRouter.children)
        }
        // return true
    })
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
