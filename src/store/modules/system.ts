// @ts-ignore
import {getConfig, getDefault, getTree} from '@/api/common.ts'
// @ts-ignore
import router from '@/router'
import {getWebMenus} from "../../api/system";

const state = {
    system: {},
    productPrimaryName: '',
    productSecondaryName: '',
    systemIcon: '',
    msgStatus: true
}

const mutations = {
    SET_SYSTEM: (state: any, system: void) => {
        state.system = system
    },
    SET_PRODUCTPRIMATYNAME: (state: any, data: void) => {
        state.productPrimaryName = data
    },
    SET_PRODUCTSECONDARYNAME: (state: any, isCollapse: void) => {
        state.productSecondaryName = isCollapse
    },
    SET_SYSTEMICON: (state: any, viewUrl: void) => {
        state.systemIcon = viewUrl
    },
    SET_MSGSTATUS: (state: any, status: void) => {
        state.msgStatus = status
    },
}

const actions = {
    // 获取系统配置信息
    getSystemMsg({commit}: any, permissions: any) {
        getDefault({}).then((res)=>{
            commit('SET_PRODUCTPRIMATYNAME', res.productPrimaryName)
            commit('SET_PRODUCTSECONDARYNAME', res.productSecondaryName)
            commit('SET_SYSTEMICON', res.systemIconFile?.viewUrl)
            commit('SET_SYSTEM', res)
        })
    },
    // 获取系统配置信息
    getSystemUserMsg({commit}: any, permissions: any) {
        getConfig({}).then((res)=>{
            commit('SET_PRODUCTPRIMATYNAME', res.productPrimaryName)
            commit('SET_PRODUCTSECONDARYNAME', res.productSecondaryName)
            commit('SET_SYSTEMICON', res.systemIconFile?.viewUrl)
            commit('SET_SYSTEM', res)
        })
    },
    setMsgStatus({commit}: any, status: any) {
        commit('SET_MSGSTATUS', status)
    },
}


export default {
    namespaced: true,
    state,
    mutations,
    actions
}
