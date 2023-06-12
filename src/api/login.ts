// @ts-ignore
import request from '@/utils/request'


//----------------------------- 获取表格数据------------------------
// 获取表格数据
export function getTableData(query: Object) {
    return request({ url: '/posts', method: 'get', params: query })
}

// 获取表格数据
export function login(params: Object) {
    return request({ url: '/auth/login', method: 'post', data: params })
}

// 获取用户信息
export function getLoginUserInfo() {
    return request({ url: '/auth/getLoginUserInfo', method: 'get' })
}

// 退出登录
export function logout() {
    return request({ url: '/auth/logout', method: 'get' })
}
