// @ts-ignore
import axios from 'axios'
// @ts-ignore
import {ElMessage, ElMessageBox} from 'element-plus'
// import store from '@/store'
// @ts-ignore
import {getToken} from '@/utils/auth'
// @ts-ignore
import store from '@/store/index.ts'

// 处理类型“AxiosResponse<any, any>”上不存在属性问题
declare module 'axios' {
    interface AxiosInstance {
        (config: AxiosRequestConfig) : Promise<any>
    }
}
const service = axios.create({
    // baseURL: import.meta.env.VITE_BASE_API,
    baseURL: '/api',
    timeout: 60000,
})
service.interceptors.request.use(
    (config: any) => {
        let token = getToken()
        if (token) {
          config.headers['voms-token'] = token
        }
        if(config.responseType) {
            config.headers['Content-Type'] = 'application/octet-stream'
        }
        return config
    },
    (error: any) => {
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    (response: { data: any, config: any }) => {
        const res = response.data
        let code = res.code
        if(response.config.responseType || response.config.flowStatus) {
            return res
        }
        switch (code) {
            case 0:
                let data = res.object
                // @ts-ignore
                return JSON.stringify(data.extend) === "{}" ? data.data : data;
                break;
            case -1:
                ElMessage({message: res.message || 'Error', type: 'warning', duration: 5 * 1000, showClose: true})
                return Promise.reject(res.message|| 'Error');
                break;
            case 401:
                ElMessage({message: res.message || 'Error', type: 'error', duration: 5 * 1000, showClose: true})
                return Promise.reject('请先登录！');
                break;
            case 402:
                ElMessage({message: res.message || '登录身份失效！', type: 'warning', duration: 5 * 1000, showClose: true })
                store.dispatch('user/logout') // 退出登录
                return Promise.reject('请先登录！');
                break;
            case 403:
                ElMessage({message: res.message || 'Error', type: 'warning', duration: 5 * 1000, showClose: true})
                return Promise.reject('没有访问权限，请联系管理员授权！');
                break;
            case 404:
                ElMessage({message: res.message || 'Error', type: 'warning', duration: 5 * 1000, showClose: true})
                return Promise.reject('未找到系统资源！');
                break;
            case 500:
                ElMessage({message: res.message || 'Error', type: 'warning', duration: 5 * 1000, showClose: true})
                return Promise.reject('服务器繁忙！');
                break;
        }
    },
    (error: { message: number[] }) => {
        let type = 500
        let msgObj = {
            400: '请检查请求参数',
            401: '请先登录',
            403: '没有权限，请联系管理员',
            500: '服务器内部错误',
            502: '网关错误',
            504: '请求超时',
        }
        if (error.message.indexOf(500) > -1) {
            type = 500
        } else if (error.message.indexOf(400) > -1) {
            type = 400
        } else if (error.message.indexOf(401) > -1) {
            // store.dispatch('user/resetToken').then(() => {
            //     location.reload()
            // })
            type = 401
        } else if (error.message.indexOf(403) > -1) {
            type = 403
        } else if (error.message.indexOf(502) > -1) {
            type = 502
        } else if (error.message.indexOf(504) > -1) {
            type = 504
        }
        // @ts-ignore
        ElMessage({message: msgObj[type], type: 'error', duration: 5 * 1000, showClose: true})
        return Promise.reject(error)
    }
)

export default service
