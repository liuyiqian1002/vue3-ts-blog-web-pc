// @ts-ignore
import request from '@/utils/request'

// 获取菜单数据
export function commonApi(url: string, params: {}, method?: string) {
  if (method == 'get') {
    return request({ url: url, params, method: method })
  } else {
    return request({ url: url, data: params, method: 'post' })
  }
}

//----------------------------- 获取表格数据------------------------
// 获取菜单数据
export function getTree(data) {
  return request({ url: '/system/permissionInfo/getTree', method: 'get', params: data })
}
// 获取动态折线
export function getDynamicline() {
  return request({ url: '/getDynamicline', method: 'get' })
}
// 获取所有的字典
export function all() {
  return request({ url: '/system/dictionary/all', method: 'get' })
}

// 获取所有下拉列表的字典
export function options() {
  return request({ url: '/system/dictionary/options', method: 'get' })
}

// 文件下载接口
export function downloadFile(fileId) {
  return request({ url: `/file/downloadFile/${fileId}`, responseType: 'blob', method: 'get' })
}

// 菜单、权限全量数据树
export function getFullTree(data) {
  return request({ url: `/system/permissionInfo/getFullTree`, method: 'get', params: data })
}

// 菜单、权限全量数据树
export function deleteFile(fileId) {
  return request({ url: `/file/deleteFile/${fileId}`, method: 'get' })
}

// 获取默认配置
export function getDefault(fileId) {
  return request({ url: `/system/systemConfigurationInfoEntity/getDefault`, method: 'get' })
}

// 首页菜单搜索接口
export function search(data) {
  return request({ url: `/system/permissionInfo/search`, method: 'get', params: data })
}

// 获取省市区
interface AreaListParams {
  keyword: string // 搜索关键字
  level: number // 1省，2市，3区
}
export function getAreaList(params: AreaListParams) {
  return request({ url: `/system/area/getAreaListByKeyword`, params: params, method: 'get' })
}
/**
 * @description 根据父类code获取区域对象
 * @param parentCode {string}
 * */
export function getAreaDtoListByParentCode(parentCode: string) {
  return request({ url: `/system/area/getAreaDtoListByParentCode/${parentCode}`, params: { parentCode }, method: 'get' })
}

// 文件下载接口-文件路径
export function downloadFileByUrl(data) {
  return request({ url: `/file/downloadFileByUrl`, method: 'get', responseType: 'blob', params: data })
}


// 获取当前用户配置
export function getConfig(data) {
  return request({ url: `/system/systemConfigurationInfoEntity/getConfig`, method: 'get', params: data })
}
