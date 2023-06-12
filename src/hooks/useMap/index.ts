import { onBeforeUnmount, onMounted, watchEffect } from 'vue'
import type { ComputedRef, Ref } from 'vue'

export interface IMapProps {
  clear: Function
}

export const useMap = (map?: any) => {
  const clearMap = () => {
    map.clearMap()
  }
  let AllMarker = []
  
  // 视频弹窗-警情列表-地图标记 TODO 可做成通用标记
  const addMarker = (row) => {
    let marker = new AMap.Marker({
      icon: 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
      position: [row.longitude, row.latitude],
    })
    marker.setMap(map)
    let speedLimit = '-'
    if (row.speedLimit != null) {
      speedLimit = row.speedLimit
    }
    marker.setLabel({
      //label默认蓝框白底左上角显示，样式className为：amap-marker-label
      offset: new AMap.Pixel(20, 20), //修改label相对于maker的位置
      content: 'GPS时间：' + row.gpsTime + ',速度：' + row.runningSpeed + ',限速：' + speedLimit,
    })
    AllMarker.push(marker)
  }
  return { clearMap, addMarker }
}
