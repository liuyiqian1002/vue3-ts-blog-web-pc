<template>
    <div class="w h3333 relative" v-loading="loading" :element-loading-background="elementLoadingBackground">
        <slot></slot>
        <div :id="id" class="w h">
    
        </div>
        <div class="val positionBc white fs24 ml3" style="bottom: 24%">{{val || 0}}%</div>
<!--        <ul class="tw_y positionBr fs10" style="height: 66%;color: #C9D9DB; bottom: 12px">-->
<!--            <li v-for="(item,i) in data" :key="i">{{data[data.length - i -1]}}次</li>-->
<!--        </ul>-->
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
// prettier-ignore
let data = [], data2= [], allNum = 0;
let colorBorder = ['rgba(21, 99, 255, 0.4)', 'rgba(102, 225, 223, 0.4)', 'rgba(255, 201, 122, 0.4)', 'rgba(21, 154, 255, 0.4)'];
let color = ['rgba(21, 99, 255, 1)', 'rgba(102, 225, 223, 1)', 'rgba(255, 201, 122, 1)', 'rgba(21, 154, 255, 1)'];
let names = {
    '班线客运': '客运',
    '旅游客运': '客运',
    '危险货物运输': '客运',
    '普通货运': '客运',
};
const update = (lists) => {
    // let { vehicleOperateTypeCountDtoList } = data
    data = []
    allNum = 0
    for (let i = 0; i < lists.length; i++) {
        if(i > 0){
            data.push({value:  2, itemStyle: {color: 'none', decal: {symbol: 'none'}}, label: {show: false}})
            data2.push({value:  2, itemStyle: {color: 'none', decal: {symbol: 'none'}}, label: {show: false}})
            allNum+=2
        }
        data.push({value: 20, data: lists[i].vehicleCount, name: lists[i].operateTypeName,emphasis: {
            label: {show: true, fontSize: 20, color: color[i]},
            labelLine: {show: true, lineStyle: {color: color[i]}}},
            itemStyle: {color: color[i], borderWidth: 4, borderColor: colorBorder[i]}
        })
        data2.push({value: 20, data: lists[i].vehicleCount, num: lists[i].vehicleLineRate, name: lists[i].operateTypeName,emphasis: {
                label: {show: true, fontSize: 20, color: color[i]},
                labelLine: {show: true, lineStyle: {color: color[i]}}},
            itemStyle: {color: 'rgba(0,0,0,0)', borderWidth: 4, borderColor: 'rgba(0,0,0,0)'}
        })
        allNum+=20
    }
    allNum = allNum + 4
    let total = parseInt(allNum / 0.65 - allNum)
    
    data.push({value:  total, itemStyle: {color: 'none', decal: {symbol: 'none'}}, label: {show: false}})
    data2.push({value:  total, itemStyle: {color: 'none', decal: {symbol: 'none'}}, label: {show: false}})
    option.series[0].data = data
    option.series[1].data = data2
    myChart.setOption(option, true)
}
defineExpose({ update })

let option = {
    // tooltip: {
    //     trigger: 'item'
    // },
    
    graphic: [{
        type: 'group',
        left: 'center',
        top: 140,
        children: [{
            type: 'text',
            z: 100,
            left: 'center',
            top: '0',
            style: {
                fill: 'rgba(255, 201, 122, 1)',
                text: [
                    '上线率'
                ],
                font: '12px Microsoft YaHei'
            }
        }
        ]}],
    series: [
        {
            name: 'Access From',
            type: 'pie',
            radius: ['60%', '90%'],
            center: ['50%', '70%'],
            startAngle: -156,
            itemStyle: {
                show: false,
                borderRadius: 6,
            },
            legendHoverLink: false,
            label: {
                show: true,
                position: 'inside',
                color: '#fff',
                fontSize: 12,
                width: 30,
                overflow: 'break',
                formatter(param) {
                    return `${param.data.name}`;
                }
            },
            // label: {
            //     show: false,
            //     position: 'inner',
            //     formatter(param) {
            //         return param.data.name;
            //     }
            // },
            data: []
        },
        {
            name: 'Access From',
            type: 'pie',
            radius: ['60%', '90%'],
            center: ['50%', '70%'],
            startAngle: -156,
            itemStyle: {
                show: false,
                borderRadius: 6,
            },
            legendHoverLink: false,
            label: {
                show: false,
                position: 'outside',
                formatter(param) {
                    return param.data.data;
                }
            },
            data: []
        }
    ]
};
let myChart = $ref(null)
let val = $ref(0)
onActivated(() => {
    let chartDom = document.getElementById(id)
    myChart = markRaw(echarts.init(chartDom))
    option && myChart.setOption(option)
    window.addEventListener('resize', myChart.resize)
    myChart.on('click', function (params) {
        if(params.data){
            val = params.data.num
        }
    });
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
