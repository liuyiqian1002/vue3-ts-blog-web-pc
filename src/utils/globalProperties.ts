// @ts-ignore
import app from '../main.ts'
import {ElMessageBox} from 'element-plus'
import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
// @ts-ignore
import {setupGlobDirectives} from '../directive/loadMore'
import lodash from 'lodash'
import {nextTick} from '@vue/runtime-core'

nextTick(() => {
    /**
     * 非空判断
     * */
    app.config.globalProperties.notNull = function (flag) {
        return flag != null && flag != '' && flag != 'null'
    }
    /**
     * 手机号脱敏处理
     * */
    app.config.globalProperties.phoneAllergic = function (tel) {
        let reg = /^(\d{3})\d{4}(\d{4})$/
        return tel ? tel.replace(reg, '$1****$2') : ''
    }

    /**
     * 下载文件
     * */
    app.config.globalProperties.download = function (res, name: '文件', type: 'xls') {
        let detailType = {xlsx: 'vnd.openxmlformats-officedocument.spreadsheetml.sheet', xls: 'vnd.ms-excel', pdf: 'pdf', zip: 'zip', doc: 'msword', docx: 'vnd.openxmlformats-officedocument.wordprocessingml.document',}[type || 'xlsx']
        let blobData = new Blob([res], {type: `application/${detailType};charset=utf-8`})
        const url = window.URL.createObjectURL(blobData)
        let a = document.createElement('a')
        // @ts-ignore
        a['style'] = 'display: none'
        a.href = url
        a.download = name
        // a.setAttribute('download', decodeURI(Date.now()+name));
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        window.URL.revokeObjectURL(url)
    }
    app.config.globalProperties.downloadByUrl = function (url, name: '文件', type: 'xls') {
        const x =  new XMLHttpRequest()
        x.open('GET',url,true)
        x.responseType ='blob'
        x.onload = function(){
            const url = window.URL.createObjectURL(x.response)
            const a = document.createElement('a')
            a.href = url
            a.download = name
            a.click()
        }
        x.send()
    }

    app.config.globalProperties.MessageBox = function (data) {
        if (!data.title) {
            data.title = '提示'
        }
        if (!data.confirmText) {
            data.confirmText = '确定'
        }
        if (!data.cancelText) {
            data.cancelText = '取消'
        }
        if (!data.type) {
            data.type = ''
        }

        // if(!data.center){ data.center=false}

        return new Promise(function (resolve, reject) {
            ElMessageBox.confirm(data.msg, data.title, {
                type: data.type,
                confirmButtonText: data.confirmText,
                cancelButtonText: data.cancelText,
                customClass: 'tw_msgBox',
                center: true,
                dangerouslyUseHTMLString: true,
                distinguishCancelAndClose: true,
                closeOnClickModal: false,
                beforeClose: (action, instance, done) => {
                    if (action === 'confirm') {
                        instance.confirmButtonLoading = true
                        instance.confirmButtonText = '执行中...'

                        function close() {
                            done()
                            instance.confirmButtonLoading = false
                        }

                        // @ts-ignore
                        resolve(close, instance)
                    } else {
                        done()
                        reject(action)
                    }
                },
            }).then((action) => {
                reject(action)
            })
        })
    }

    // 时间控件禁止函数
    app.config.globalProperties.disabledAfterToday = (date) => {
        const today = dayjs() // 获取今天的日期
        const isAfterToday = dayjs(date).isAfter(today, 'day')
        if (isAfterToday) {
            return true
        } else {
            return false
        }
    }

    setupGlobDirectives(app)
    // getSelectVal(app)
    dayjs.extend(isSameOrAfter)
    app.config.globalProperties.$dayjs = dayjs
    app.config.globalProperties.$_ = lodash
    app.config.globalProperties.$oss = '?x-oss-process=image/resize,w_100,limit_0'
})
