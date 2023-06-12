<!-- 7 天警情类型排行（top5） -->
<template>
    <div
        class="w h3333 relative"
        v-loading="loading"
        :element-loading-background="elementLoadingBackground"
    >
        <slot></slot>
        <div :id="id" class="w h"></div>
    </div>
</template>

<script setup lang="ts">
// prettier-ignore
import * as echarts from "echarts";

const { id, defaultStyle, lists, loading, elementLoadingBackground } = defineProps({
        id: { type: String, default: 'vehicle' },
        defaultStyle: {
            type: Object,
            default: () => {
                return { width: '100%', height: '500px' }
            },
        },
        lists: { type: Array, default: () => [] },
        loading: { type: Boolean, default: false },
        elementLoadingBackground: String,
    })

let dataAxis = ['疲劳驾驶', '超速驾驶', '轨迹不完整', '路线偏离', '终端掉线']
// prettier-ignore
let data = [31, 127, 671, 85, 356];
const update = (list) => {
    dataAxis = []
    data = []
    for (let i = 0; i < list.length; i++) {
        // let str = list[i].alarmTypeName.length>5?list[i].alarmTypeName.substr(0,5) + '...':list[i].alarmTypeName
        dataAxis.push(list[i].alarmTypeName)
        data.push(list[i].alarmCount)
    }
    option.xAxis.data = dataAxis
    option.series[0].data = data
    myChart.setOption(option, true)
}
defineExpose({ update })

// prettier-ignore
let option = {
    tooltip: {
        confine: true,
        trigger: 'axis',
        axisPointer: {
            type: 'shadow',
        },
        // backgroundColor: 'rgba(3, 16, 42, 0.85)',
        borderColor: 'rgba(114, 190, 253, 0.6)',
        borderWidth: 1,
        padding: 12,
    },
    grid: {
        left: 60,
        top: 90,
        bottom: '15%',
        right: '5%',
    },
    xAxis: {
        axisTick: {
            show: false,
        },
        axisLine: {
            show: false,
        },
        axisLabel: {
            color: 'rgba(243,255,255,1)',
            fontSize: 10,
            padding: [8, 0, 0, 0],
            show:true,
            interval:0,
            width:500,
            overflow:"breakAll"
        },
        data: dataAxis,
    },
    yAxis: {
        type: 'value',
        name: '单位：次',
        min: 0,
        minInterval: 1,
        nameTextStyle: {
            align: 'right',
            fontSize: 9.5,
            color: "#fff",
            padding: [0, 10, 0,0],
        },
        splitNumber: 4,
        splitLine: {
            lineStyle: {
                color: 'rgba(255, 255, 255, 0.08)',
                type: 'dashed', // dotted 虚线
            },
        },
        splitArea: { show: false },
        axisLine: {
            show: false,
        },
        axisTick: {
            show: false,
        },
        axisLabel: {
            align: 'right',
            fontSize: 10,
            color: '#fff',
            fontFamily: 'Bebas',
            padding: [0, 20, 0,0],
        },
    },
    series: [{
        name: '',
        type: 'pictorialBar',
        barCategoryGap: '-4px',
        symbol: 'image://data:image/png;base64,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',
        // symbol: 'path://M12.000,-0.000 C12.000,-0.000 16.074,60.121 28.731,60.121 C26.173,60.121 -3.234,60.121 -6.511,60.121 C7.072,60.121 12.000,-0.000 12.000,-0.000 Z',
        label: {
            show: false,
            position: 'top',
            distance: 5,
            color: '#fff',
            fontSize: 12,
            fontFamily: 'Bebas',
        },
        labelLine: {
            show: false,
            lineStyle:{
                color: 'rgba(20,196,255,1)',
                width: 1
            }
        },
        itemStyle: {
            borderType: 'solid',
            borderWidth: 10,
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                    { offset: 0, color: 'rgba(0,200,255,0)' },
                    { offset: 1, color: 'rgba(20,239,255,1)' }
                ]),
                // color(params) {
                //     let colorList = ['pink', '#1EE7E7', 'yellow', '#2F54EB']
                //     return colorList[params.dataIndex]
                // },
            },
            emphasis: {
                opacity: 1,
            },
        },
        data: data,
        z: 10,
    }],
};
let myChart = $ref(null)
let listsData = $ref([])
onActivated(() => {
    let chartDom = document.getElementById(id)
    myChart = markRaw(echarts.init(chartDom))
    option && myChart.setOption(option)
    window.addEventListener('resize', myChart.resize)
})

onUnmounted(() => {
    window.removeEventListener('resize', myChart.resize)
})

onDeactivated(() => {
    window.removeEventListener('resize', myChart.resize)
})




</script>

<style scoped lang="scss">
</style>
