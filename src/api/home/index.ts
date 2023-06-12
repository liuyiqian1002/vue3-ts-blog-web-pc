// @ts-ignore
import request from '@/utils/request'



// 首页根据权限获取省-市列表
export function getAreaList(params: Object) {
    return request({ url: '/system/area/getAreaList', method: 'get', data: params })
}

// 7天车辆报警排行
export function getVehicleAlarmTop5Info(params: Object) {
    return request({ url: '/statistics/homePage/getVehicleAlarmTop5Info', method: 'get', params: params })
}

// 车辆总数及上线情况
export function getVehicleDetail(params: Object) {
    return request({ url: '/statistics/homePage/getVehicleDetail', method: 'get', params: params })
}

// 7天报警类型排行
export function getAlarmTypeTop5Dto(params: Object) {
    return request({ url: '/statistics/homePage/getAlarmTypeTop5Dto', method: 'get', params: params })
}
// 7天风险时段
export function getHomePage24HourStatisticsDto(params: Object) {
    return request({ url: '/statistics/homePage/getHomePage24HourStatisticsDto', method: 'get', params: params })
}
//报警趋势（营运类型）
export function getAlarmCount(params: Object) {
    return request({ url: '/statistics/homePage/getAlarmCount', method: 'get', params: params })
}

// 报警趋势（区域）
export function getHomePageAreaAlarmChartDto(params: Object) {
    return request({ url: '/statistics/homePage/getHomePageAreaAlarmChartDto', method: 'get', params: params })
}
// 车辆分布
export function getVehicleInfo(params: Object) {
    return request({ url: '/statistics/homePage/getVehicleInfo', method: 'get', params: params })
}

// 获取各地区车辆数
export function getCnAreaVehicleCount(params: Object) {
    return request({ url: '/business/vehicleArea/getCnAreaVehicleCount', method: 'post', data: params })
}

// 获取城市下车辆经纬度
export function getDistrictVehicleCount(params: Object) {
    return request({ url: '/business/vehicleArea/getDistrictVehicleCount', method: 'get', params: params })
}

// 车辆行业分布
export function getOperateType(params: Object) {
    return request({ url: '/statistics/homePage/getOperateType', method: 'get', params: params })
}
