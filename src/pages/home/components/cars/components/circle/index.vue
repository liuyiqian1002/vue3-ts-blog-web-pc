<template>
    <div v-loading="loading" :style="defaultStyle">
        <div class="defaultClass" :id="id" :style="defaultStyle"></div>
        <div class="regional_data absolute" @mousewheel="rollScroll($event)">
            <div class="overflow h">
                <!--                -->
                <ul class="regional_ul" :class="``" :interval="30000" :style="`transform: translateY(${translateY}px);${regional_ul_status?'transition: 0.6s cubic-bezier(0.075, 0.82, 0.165, 1)':''}`" direction="vertical" ref="carousel" trigger="click" indicator-position="none" @change="carouselChange">
                    <li @click="tapCity(i)" class="regional_li pointer" v-for="(item, i) in datalist" :key="i" pause-on-hove :style="`${item.transform}; ${regional_ul_status?'transition: 1s cubic-bezier(0.075, 0.82, 0.165, 1);':''}`">
                        <div class="regional_text title fs12"> {{ item.title }} </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import {nextTick} from "@vue/runtime-core";

const { proxy} = getCurrentInstance()
const { id, defaultStyle, lists, loading } = defineProps({
    id: { type: String, default: 'container' },
    defaultStyle: {
        type: Object,
        default: () => {
            return { width: '100%', height: '500px' }
        },
    },
    lists: { type: Array, default: () => [] },
    loading: { type: Boolean, default: false },
})
let data: any = [], flag= true;
let datalist = $ref([])
const update = ({ list }) => {
    data = []
    for (let i = 0; i < list.length; i++) {
        let name = list[i].areaName.indexOf('恩施')>=0?'恩施市':list[i].areaName
        data.push({ value: list[i].vehicleCount, name: name })
        datalist.push({ title: name, index: i, transform: '' })
    }
    // for (let i = 0; i < 5; i++) {
    //     datalist.push({ title: datalist[i].title, index: datalist[i].index, transform: '' })
    // }
    option.series[0].data = data
    myChart.setOption(option, true)
    if(flag){
        setTransform(dataIndex)
        flag = false
        timer = setInterval(nfSetCarsY, timerNum)
        myChart.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: dataIndex,
            position: function () { }
        })
    }
}
defineExpose({ update })




let option = {
    title: {},
    tooltip: {
        show: true,
        trigger: 'item',
        triggerOn: 'none',
        formatter: '{b} :<br/> {c} ({d}%)',
        borderWidth: 1,
        borderColor: 'rgba(82, 206, 255, 1)', //边框颜色
        backgroundColor: 'rgba(26, 31, 59, 1)', // 提示框背景颜色
        textStyle: {
            // fontSize: 16,
            color: 'rgba(82, 206, 255, 1)', // 设置文本颜色 默认#FFF
        },
        position: function (pt) {
            return [pt[0], 130];
        }
    },
    grid: {
        left: 50,
        top: 90,
        bottom: '15%',
        right: '5%',
    },
    series: [
        {
            name: '车辆占比',
            type: 'pie',
            radius: [15, 86], // 设置环形饼状图， 第一个百分数设置内圈大小，第二个百分数设置外圈大小
            center: ['70%', '62%'], //图的位置，距离左跟上的位置
            // legendHoverLink: false,
            // avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false, //隐藏标线
                },
            },
            emphasis: {
                // 饼图鼠标移入的样式效果
                disable: true, //是否关闭扇区高亮效果
                scale: true, //扇区是否缩放
                scaleSize: 14, //放大的尺寸，这里为了保证不放大扇区设置的，可要可不要
            },
            select:{
            
            },
            data: data,
        },
    ],
}

let myChart = $ref(null)
let dataIndex = $ref(0)
let carousel = $ref(null)
let regional_ul_status = $ref(true)
let translateY = $ref(0)
translateY = -(dataIndex-2)*44

let lastIndex = 0
const carouselChange = (i)=>{
    let fistIndex =  i == 0? 9: i-1
    // console.log(dataIndex, fistIndex);
    // if(dataIndex == fistIndex) return
    // myChart.dispatchAction({ type: 'downplay', dataIndex: 0 });
    myChart.dispatchAction({
        type: 'hideTip',
        seriesIndex: 0,
        dataIndex: lastIndex,
    })
    myChart.dispatchAction({
        type: 'downplay',
        seriesIndex: 0,
        dataIndex: lastIndex,
    })
    
    myChart.dispatchAction({
        type: 'showTip',
        seriesIndex: 0,
        dataIndex: i,
        position: function (params) {
            // if(datalist.position){
            //     return datalist.position
            // }else{
            //     datalist.position = params
            //     return  params
            // }
        }
    })
    myChart.dispatchAction({
        type:'highlight',
        seriesIndex: 0,
        dataIndex: i
    })
    lastIndex = i
}

const setTransform = (i)=>{
    datalist[i-1]?datalist[i-1].transform = 'transform: translateX(20px);':''
    datalist[i]?datalist[i].transform = 'transform: translateX(50px);':''
    datalist[i+1]?datalist[i+1].transform = 'transform: translateX(20px);':''
}

const tapCity = ( index)=>{
    clearInterval(timer)
    myChart.dispatchAction({
        type: 'hideTip',
        seriesIndex: 0,
        dataIndex: datalist[index].index,
    })
    nextTick(()=>{
        dataIndex = index
        translateY = -(dataIndex-2)*44
        datalist.forEach(item=> item.transform = '')
        setTransform(dataIndex)
        carouselChange(datalist[dataIndex].index)
        timer = setInterval(nfSetCarsY,timerNum)
    })
}

let timer = null, timerNum = 3000

const nfSetCarsY = ()=>{
    dataIndex++
    if(dataIndex<datalist.length){
        translateY = -(dataIndex-2)*44
        datalist.forEach(item=> item.transform = '')
        setTransform(dataIndex)
        carouselChange(datalist[dataIndex].index)
    }
    if(dataIndex>(datalist.length - 1)){  // 无感循环
        setTimeout(()=>{
            regional_ul_status = false
            dataIndex = 0
            translateY = -(dataIndex-2)*44
            if(dataIndex<datalist.length)carouselChange(datalist[dataIndex].index)
            setTransform(dataIndex)
            setTimeout(()=>{
                regional_ul_status = true
            }, 600)
        }, 600)
    }
    
}

onActivated(()=>{
    let chartDom = document.getElementById(id)
    myChart = markRaw(echarts.init(chartDom))
    option && myChart.setOption(option)
    window.addEventListener('resize', myChart.resize)
    if(!flag){
        timer = setInterval(nfSetCarsY, timerNum)
    }
    
    // 添加事件
    myChart.on('click', function (params) {
        clearInterval(timer)
        nextTick(()=>{
            if(!flag){
                flag = false
                clearInterval(timer)
            }
            dataIndex = params.dataIndex
            translateY = -(dataIndex-2)*44
            datalist.forEach(item=> item.transform = '')
            setTransform(dataIndex)
            carouselChange(dataIndex)
            console.log(2,'开启定时器');
            timer = setInterval(nfSetCarsY,timerNum)
        })
    });
})
onMounted(() => {
    // let chartDom = document.getElementById(id)
    // myChart = markRaw(echarts.init(chartDom))
    // option && myChart.setOption(option)
    // window.addEventListener('resize', myChart.resize)
    // timer = setInterval(nfSetCarsY, timerNum)
})
onUnmounted(() => {
    clearInterval(timer)
    window.removeEventListener('resize', myChart.resize)
})
onDeactivated(() => {
    clearInterval(timer)
    window.removeEventListener('resize', myChart.resize)
})
const rollScroll = proxy.$_.throttle((event: any) => {
    let scrollVal = event.wheelDelta || event.detail
    clearInterval(timer)
    if (scrollVal<0) {
        let num = (datalist.length-5)*44
        if(translateY>num){
            dataIndex>2? dataIndex--: dataIndex = 2
        }else {
            dataIndex<datalist.length-1? dataIndex++: dataIndex = datalist.length-1
        }
        tapCity(dataIndex)
    }else{
        dataIndex>0? dataIndex--: dataIndex = 0
        tapCity(dataIndex)
    }
    proxy.$_.debounce(()=>timer = setInterval(nfSetCarsY,timerNum), 500)
},600)

</script>

<style scoped lang="scss">
.defaultClass{
    z-index: 1;
}
.regional_data {top: 21%; width: 215px;left: 0; background-size: cover; background: url('@/assets/images/homepage/regionalbj.png') no-repeat;background-position: 40px 0;z-index: 10;height: 86%;
    .regional_ul { top: 13%; font-family: '上首时尚体'; letter-spacing: 2.7px; color: rgba(170, 170, 170, 1);
        .regional_text{font-family: "上首时尚体";letter-spacing: 1.8px;};
        .regional_li { width: 84px; height: 42px; line-height: 41px; background: url('@/assets/images/homepage/regionalbtn.png') no-repeat;margin-bottom: 2px; }
    }
    :deep(.el-carousel__mask) { background: none !important; }
    :deep(.el-carousel__container) { height: 150px !important; }
    :deep(.is-active) { color: #45dbff !important; margin-left: 9% !important; transition: all 0.5s !important; background: url('@/assets/images/homepage/regionalxz.png') !important; }
    .regional_li_active { }
    .regional_li_active_max { }
}
</style>
