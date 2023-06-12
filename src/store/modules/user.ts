// import { login, getInfo, loginOut } from '@/api/auth'
// @ts-ignore
import { getToken, setToken, removeToken, setSessionStorage } from "@/utils/auth"
// @ts-ignore
import { login, getLoginUserInfo, logout } from '@/api/login'
// @ts-ignore
import router from "@/router"

const state = {
    userId: null,
    users: {},
    productCode: 'XXPT',
    token: '',
    permissions: null
}

const mutations = {
    SET_PERMISSIONS: (state, permissions) => {
        state.permissions = permissions
    },
    SET_USERS: (state, users) => {
        state.users = users
    },
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_USERID: (state, userId) => {
        state.userId = userId
    },
    SET_PRODUCTCODE: (state, productCode) => {
        state.productCode = productCode
    },
}

const actions = {
    login({commit, dispatch}: any, ruleForm: any){
        // const { loginName, loginPassword, loginType } = userInfo
        return new Promise((resolve,reject)=>{
            login(ruleForm).then((res: any)=>{
                setToken(res)
                // dispatch('getUserInfo').then(()=>{
                    resolve(res)
                // })
            }).catch((err: any)=>{
                reject()
            })
        })
    },
    // 获取个人信息和权限信息
    getUserInfo({commit, dispatch}: any, ruleForm: any){
        return new Promise((resolve,reject)=>{
            getLoginUserInfo(ruleForm).then((res: any)=>{
                let permissions:object = {}, num = res.permissions.length
                for (let i = 0; i < num; i++) {
                    permissions[res.permissions[i]] = true
                }
                commit('SET_PERMISSIONS', permissions)
                setSessionStorage('permissions', JSON.stringify(permissions))
                commit('SET_USERS', res)
                commit('SET_TOKEN', res.token)
                commit('SET_USERID', res.userId)
                commit('SET_PRODUCTCODE', res.productCode)
                resolve({res,permissions})
            }).catch((err: any)=>{
                reject()
            })
        })
    },
    logout({commit, dispatch}: any){
        return new Promise((resolve,reject)=>{
            logout().then((res: any)=>{
                removeToken()
                commit('SET_USERS', {})
                commit('SET_TOKEN', null)
                commit('SET_USERID', null)
                commit('SET_PERMISSIONS', null)
                dispatch('tagsView/delAllViews', [], { root: true })
                router.push('/login')
                resolve(res)
            }).catch((err: any)=>{
                // 后端只兼容了一次的退出登录判断，如果多次，就会像其它接口返回402
                removeToken()
                commit('SET_USERS', {})
                commit('SET_TOKEN', null)
                commit('SET_USERID', null)
                commit('SET_PERMISSIONS', [])
                dispatch('tagsView/delAllViews', [], { root: true })
                router.push('/login')
                reject()
            })
        })
    },
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}
