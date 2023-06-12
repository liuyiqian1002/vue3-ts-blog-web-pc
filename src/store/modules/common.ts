// @ts-ignore
import router from '@/router'
import {all, options} from "@/api/common";
import store from "@/store";

const state = {
    oEnumerate: {},
    arrEnumerate: []
}

const mutations = {
    SET_OENMERATE: (state: any, oEnumerate: Object) => {
        state.oEnumerate = oEnumerate
    },
    SET_ARRENUMERATE: (state: any, arrEnumerate: any) => {
        state.arrEnumerate = arrEnumerate
    },
}

const actions = {
    // 设置全局枚举
    setoEnumerate({commit}: any) {
        return new Promise((resolve,reject)=>{
            all().then(res=>{
                commit('SET_OENMERATE', res)
                resolve(res)
            }).catch(()=>{
                reject()
            })
        })
    },
    // 菜单显示状态
    setArrEnumerate({commit}: any) {
        return new Promise((resolve,reject)=>{
            options().then(res=>{
                commit('SET_ARRENUMERATE', res)
                resolve(res)
            }).catch(()=>{
                reject()
            })
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
