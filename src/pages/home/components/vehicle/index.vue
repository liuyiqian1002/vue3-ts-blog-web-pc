<template>
    <div class="w h3333 relative" v-loading="loading" :element-loading-background="elementLoadingBackground">
        <slot></slot>
        <div :id="id" class="w h">
    
        </div>
        <ul class="tw_y positionBr fs10" style="height: 66%;color: #C9D9DB; bottom: 12px">
            <li v-for="(item,i) in data" :key="i">{{data[data.length - i -1]}}次</li>
        </ul>
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
    elementLoadingBackground: String
})
let dataAxis = [ '鄂N53259', '鄂N53259', '鄂N53259', '鄂N53259', '鄂N53259'];
// prettier-ignore
let data = $ref([]);
const update = (list) => {
    dataAxis = []
    data = []
    for (let i = 0; i < list.length; i++) {
        dataAxis.unshift(list[i].name)
        data.unshift(list[i].value)
    }
    option.yAxis.data = dataAxis
    option.series[0].data = data
    myChart.setOption(option, true)
}
defineExpose({ update })

let option = {
    grid: {
        //表格位置
        bottom: 0, //根据canvas所在div
        left: 80, //位置设置
        height: "76%", //宽高根据所有包含网格标题的大小所以要算进去
        width:"70%"//不设置为自适应
    },
    xAxis: {
        show: false,
    },
    yAxis: {
        data: dataAxis,
        axisLine: {
            show: false,
        },
        axisTick: {
            show: false
        },
        axisLabel: {
            align: 'left',
            width: 80,
            color: 'rgba(201,217,219,1)',
        },
        offset: 70
    },
    series: [
        {
            type: 'bar',
            barWidth: 5,
            showBackground: true,
            backgroundStyle:{
                color: 'rgba(214,214,214,0.2)'
            },
            label: {   // 图形上的文本标签
                show: false,
                rotate: 180,  // 旋转角度
                color: '#eee'
            },
            itemStyle: {
                color: function ({dataIndex}){
                    //我这边就两个柱子，大致就两个柱子颜色渐变，因此数组只有两个值，多个颜色就多个值
                    let colorList = [
                        ['rgba(37,219,247,0)','rgba(37,219,247,0.5)','#25DBF7'],
                        ['rgba(37,219,247,0)','rgba(37,219,247,0.5)','#25DBF7'],
                        ['rgba(255,201,122,0)','rgba(255,201,122,0.5)','#FFC97A'],
                        ['rgba(255,119,52,0)','rgba(255,119,52,0.5)','#FF7734'],
                        ['rgba(255,56,56,0)','rgba(255,56,56,0.5)','#FF3838'],
                    ];
                    return new echarts.graphic.LinearGradient(0, 0, 1, 0,
                        [
                            {offset: 0, color: colorList[dataIndex][0]},
                            // {offset: 0.5, color: colorList[dataIndex][1]},
                            {offset: 1, color: colorList[dataIndex][2]}
                        ]);
                },
            },
            emphasis: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                    { offset: 0, color: '#2378f7' },
                    { offset: 0.7, color: '#2378f7' },
                    { offset: 1, color: '#83bff6' }
                ])
            },
            data: data
        }
    ]
};
let myChart = $ref(null)
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
