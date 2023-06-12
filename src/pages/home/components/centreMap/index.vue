<template>
    <!--新新已改:中间地图-->
    <div className="map-center w">
<!--        <el-auto-resizer>-->
<!--            <template #default="{ height, width }">-->
                <div class="map-city map-city-scale w h" id="map"></div>

<!--            </template>-->
<!--        </el-auto-resizer>-->
    </div>
</template>

<script setup lang="tsx">
import * as echarts from 'echarts';

let { areaId, areaItem } = defineProps({
    areaId: [Number|| String],
    areaItem: Object
})
let myChart = $ref(null), option = reactive({});
let {proxy} = getCurrentInstance()


let chinaData = []  // 线
let points = []     // 散点
let mapData = []     // 散点
let pointsRatio = []

let bubble = 'image://data:image/png;base64,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'
let bubbleLv = 'image://data:image/png;base64,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'
let bubbleC = 'image://data:image/png;base64,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'
    
    let dataEffectScatter = {
    type: 'effectScatter',
    coordinateSystem: 'geo',
    showEffectOn: 'render',
    zlevel: 1,
    rippleEffect: {
        number: 1, period: 2, scale: 34, brushType: 'fill'
    },
    markPoint: {
        silent: false
    },
    itemStyle: {color: '#1DE9B6', shadowBlur: 0, shadowColor: '#ee0085'},
        // 提示框
        // tooltip: {
        //     trigger: 'item',           // 触发类型，默认数据触发，见下图，可选为：'item' ¦ 'axis'
        //     showDelay: 20,             // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
        //     hideDelay: 100,            // 隐藏延迟，单位ms
        //     transitionDuration: 0.4,  // 动画变换时间，单位s
        //     backgroundColor: 'rgba(0,0,0,0.7)',     // 提示背景颜色，默认为透明度为0.7的黑色
        //     borderColor: '#333',       // 提示边框颜色
        //     borderRadius: 4,           // 提示边框圆角，单位px，默认为4
        //     borderWidth: 0,            // 提示边框线宽，单位px，默认为0（无边框）
        //     textStyle: {
        //         color: '#fff'
        //     },
        //     formatter: function (params) {
        //         return `开往${params.name}方向：${params.value || 0}台`;
        //     },
        // },
    data: points
} //地图线的动画效果
let dataLines = {
    type: 'lines',
    zlevel: 2,
    // 提示框
    tooltip: {
        trigger: 'item',           // 触发类型，默认数据触发，见下图，可选为：'item' ¦ 'axis'
        showDelay: 20,             // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
        hideDelay: 100,            // 隐藏延迟，单位ms
        transitionDuration: 0.4,  // 动画变换时间，单位s
        backgroundColor: 'rgba(0,0,0,0.7)',     // 提示背景颜色，默认为透明度为0.7的黑色
        borderColor: '#333',       // 提示边框颜色
        borderRadius: 4,           // 提示边框圆角，单位px，默认为4
        borderWidth: 0,            // 提示边框线宽，单位px，默认为0（无边框）
        textStyle: {
            color: '#fff'
        },
        formatter: function (params) {
            return `开往${params.name}方向：${params.value || 0}台`;
        },
    },
    effect: {
        show: true,
        period: 4, /*箭头指向速度，值越小速度越快*/
        trailLength: 0.4, /*特效尾迹长度[0,1]值越大，尾迹越长重*/
        symbol: 'arrow', /*箭头图标*/
        symbolSize: 7, /*图标大小*/
    },
    silent: false,
    lineStyle: {
        color: '#1DE9B6',
        width: 1, /*线条宽度*/
        opacity: 0.1, /*尾迹线条透明度*/
        curveness: .3 /*尾迹线条曲直度*/
    },
    data: []
}


import allChina from './allChina.json'
import china from './china.json'
import wuhan from './wuhan.json'
import {getCurrentInstance} from "vue";
import {getCnAreaVehicleCount, getDistrictVehicleCount} from "../../../../api/home";
import axios from "axios";
import {markRaw} from "@vue/runtime-core";

const extendsMap = (id, opt) => {
    let map = document.getElementById(id),
    myChart = markRaw(echarts.init(map));
// var uploadedDataURL = "/asset/get/s/data-1482909892121-BJ3auk-Se.json";
// myChart.showLoading();
// 层级索引
    let name = ['中国'];
    let pos = {
        leftPlus: 40,
        leftCur: 150,
        left: 38,
        top: 0
    };
    let line = [[0, 0], [4, 5], [0, 10]];
// style
    let style = {
        font: '18px "Microsoft YaHei", sans-serif',
        textColor: '#eee',
        shadowBlur: 10,
        shadowColor: '#eee',
    };
    let defaultOpt = {
        parentCodeName: '中国',     // 地图展示
        mapCode: 0,
        goDown: false,        // 是否下钻
        activeArea: [],       // 区域高亮,同echarts配置项
        data: [],
        // 下钻回调(点击的地图名、实例对象option、实例对象)
        callback: function (name, option, instance) {
        }
    };
    if (opt) opt = proxy.$_.extend(defaultOpt, opt);
    
    /**
     * name 地图名
     **/
    const createBreadcrumb = (n, data) => {
        let left = 0
        if (option.graphic.length > 1){
            left = option.graphic[0].left + 160
        }else {
            left = 104
        }
        let breadcrumb = {
            type: 'group',
            id: n,
            left: left,
            top: pos.top + 1,
            children: [{
                type: 'image',
                left: -100,
                top: -10,
                x: -100,
                enterFrom: {/* 淡入 */ style: { opacity: 0 },/* 从左飞入 */ x: -110},
                silent: true,
                style: {
                    image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARzQklUCAgICHwIZIgAAAEnSURBVDiNpZM9SwNBEIafOS+GgNjJNsEqX1gHLlhFbAVLK0HIv7DRysL/kMrG9PaKRchpH+QSm0DKWAoBk9cmhxuI+dC3epndnX1mZxZmqj8q5A+y1BQ62s2As5Bxt2qDzRP0lM2M2J+AU0BgX7wnhzZclSBITb9oYxkfAFvGHiGn5Y6O1ibwVejoIAioA86Ek3hKana/lMBXv2Zd4NW75qwcq7E2ga9irBODhoETOKCZRHazlMBXL7IHRMsLXZZiXa+dAGBWf9MLXaVm5fBUYpUkzoFjAIznYMJtur70DSovupCoCRzGUAF3varF/p6FBGkbp+AMQLSSaHEb5wjybeV2tikgSlPhAvhEtN8iS36j/Pco/5QwIgsQhgw2+UxzyreV2/TMN9FJY7ZFkc4UAAAAAElFTkSuQmCC',
                    stroke: '#fff',
                    key: n
                },
                onclick: function (params) {
                    // var name = this.style.key;
                    // handleEvents.resetOption(myChart, option, name);
                }
            }, {
                type: 'text',
                left: -68,
                top: 'middle',
                style: {
                    text: n,
                    textAlign: 'center',
                    fill: style.textColor,
                    font: style.font,
                    shadowBlur: style.shadowBlur,
                    shadowColor: style.shadowColor
                },
                transition: 'style',
                onclick: function (params) {
                    mapReset(myChart, option, n, {data: {code: data.code,}});
                },
                data: data
            },{
                type: 'image',
                left:  -88,
                top: -18,
                scale: [1, 1],
                silent: true,
                style: {
                    image: 'data:image/png;base64,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',
                    width: `${n.length*20+30}`,
                    height: 32
                },
            }]
        }
        pos.leftCur += pos.leftPlus;
        return breadcrumb;
    }
    
    // zoom动画
    const zoomAnimation = () => {
        let count = null;
        let zoom = function (per) {
            if (!count) count = per;
            count = count + per;
            option.geo.zoom = count;
            option.series[0].zoom = count
            myChart.setOption(option, true);
            if (count < 1) window.requestAnimationFrame(function () {
                zoom(0.2);
            });
        };
        window.requestAnimationFrame(function () {
            zoom(0.2);
        });
    }
    
    // 重绘
    const mapReset = (c, o, n, {data}) => {
        let breadcrumb:any = createBreadcrumb(n, data)
        let j = name.indexOf(n);
        let l = option.graphic.length;
        if (j < 0) {
            option.graphic.push(breadcrumb);
            name.push(n);
        } else {
            option.graphic.splice(j + 1, l);
            name.splice(j + 1, l);
            pos.leftCur -= pos.leftPlus * (l - j - 1);
        }
        option.geo.map = data.code;
        option.geo.zoom = 0.2;
        option.series[0].zoom = 0.2
        option.series[0].map = data.code
        if (option.graphic.length == 3) {
            getDistrictVehicleCount({code: data.code}).then((res)=>{
                let areaData = []
                res.forEach(item=> item.push(1))
                areaData = res
                o.visualMap = {
                    min: 0,
                    max: 40,
                    show: false,
                    inRange: {color: ['#50a3ba', '#eac736', '#d30014']},
                    textStyle: {color: '#fff'}
                }
                // option.series[0].label.show = false
                option.series = [option.series[0], {
                    name: '热图',
                    type: 'heatmap',
                    coordinateSystem: 'geo',
                    data: areaData
                }]
                c.clear();
                c.setOption(option, true);
                zoomAnimation();
                opt.callback(n, option, c);
            })
        } else {
            getCnAreaVehicleCount({parentCode:data.code}).then(res=>{
                option.series = [o.series[0]]
                chinaData = []
                points = []
                mapData = []
                let arr = []
                res.countDtoLis.forEach(item=>{
                    let val = res.code == item.code?0: item.count
                    chinaData.push({ value: val,name: item.name, lineStyle: {color: 'rgba(29,253,253, 0.5)'}, coords: [res.value, [item.longitude, item.latitude]]})
                    points.push({ value:[item.longitude, item.latitude], name: item.name, count: val, symbol:'',symbolSize: 1  })
                    mapData.push({ name: item.name, value: val, code: item.code, coords: [item.longitude, item.latitude]})
                    if(res.code != item.code){
                        arr.push(item.count)
                    }
                })
                setLineData(arr)
                option.series[0].label.show = true
                let optData = proxy.$_.cloneDeep(dataLines)
                let dataTwo = proxy.$_.cloneDeep(dataEffectScatter)
                optData.data = chinaData
                dataTwo.data = points
                delete option.visualMap
                option.geo.data = mapData;
                option.series[0].data = mapData
                option.series = [option.series[0], dataTwo, optData]
    
                c.clear();
                c.setOption(option, true);
                zoomAnimation();
                opt.callback(n, option, c);
            })
        }
        
        
    }
    
    let data = proxy.$_.cloneDeep(dataLines)
    let dataTwo = proxy.$_.cloneDeep(dataEffectScatter)
    data.data = opt.chinaData
    dataTwo.data = opt.points
    option = {
        tooltip: {
            trigger: 'item',
            formatter: proxy.$_.throttle((params)=> {
                    return `开往${params.name}方向：${params.value || 0}台`
            },100)
        },
        graphic: [{
            id: 1,
            type: 'group',
            left: pos.left + 2,
            top: pos.top,
            children: [{
                type: 'text',
                left: 0,
                top: 'middle',
                style: {
                    text: opt.parentCodeName,
                    textAlign: 'center',
                    fill: style.textColor,
                    font: style.font,
                    shadowBlur: 10,
                    shadowColor: 'rgba(128, 217, 248, 1)'
                },
                transition: 'style',
                onclick: function (params) {
                    mapReset(myChart, option, opt.parentCodeName, {data: {code: '100000',}});
                },
                data: { code: '100000', name: '中国'}
            },{
                type: 'image',
                left: -16,
                top: -18,
                scale: [1, 1],
                silent: true,
                style: {
                    image: 'data:image/png;base64,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',
                    width: 70,
                    height: 32
                },
            }]
        }],
        geo: {
            map: opt.mapCode,
            aspectScale: 0.75, //长宽比
            zlevel: 0,
            zoom: 1,
            roam: false,
            itemStyle: {
                opacity: 0,
                borderWidth: 2,
                areaColor: {
                    type: 'radial',
                    x: 0.5,
                    y: 0.5,
                    r: 0.8,
                    colorStops: [{
                        offset: 0,
                        color: '#09132c' // 0% 处的颜色
                    }, {
                        offset: 1,
                        color: '#274d68'  // 100% 处的颜色
                    }],
                    globalCoord: true // 缺省为 false
                },
                shadowColor: 'rgb(58,115,192)',
                shadowOffsetX: 0,
                shadowOffsetY: 0
            },
            emphasis: {
                areaColor: '#2AB8FF',
                borderWidth: 0,
                color: 'green',
                label: {
                    show: false
                }
            },
            regions: [{
                name: '南海诸岛',
                itemStyle: {
                    areaColor: 'rgba(0, 10, 52, 1)',
                    borderColor: 'rgba(0, 10, 52, 1)',
                    opacity: 0,
                    label: {
                        show: false,
                        color: "#009cc9",
                    }
                },
            }],
        },
        series: [{
            type: 'map',
            roam: false,
            // 提示框
            tooltip: {
                show: false,
                trigger: 'item',           // 触发类型，默认数据触发，见下图，可选为：'item' ¦ 'axis'
                showDelay: 20,             // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
                hideDelay: 100,            // 隐藏延迟，单位ms
                transitionDuration: 0.4,  // 动画变换时间，单位s
                backgroundColor: 'rgba(0,0,0,0.7)',     // 提示背景颜色，默认为透明度为0.7的黑色
                borderColor: '#333',       // 提示边框颜色
                borderRadius: 4,           // 提示边框圆角，单位px，默认为4
                borderWidth: 0,            // 提示边框线宽，单位px，默认为0（无边框）
                textStyle: {
                    color: '#fff'
                },
                formatter: function (params) {
                    return `开往${params.name}方向：${params.value || 0}台`;
                },
            },
            label: {
                show: true,
                color: '#fff',
                fontSize: '10px'
            },
            itemStyle: {shadowBlur: 20, shadowColor: '#0b66a9', borderColor: 'rgb(74, 206, 232)', areaColor: '#0b66a9'},
            emphasis: {  shadowColor: 'rgb(12,25,50)',label: { color: '#fff',}, itemStyle: {
                    areaColor: '#4A9FE8'
                }},
            select: {
                label: {color: '#fff'},
                itemStyle: { areaColor: '#0b66a9', }
            },
            zoom: 1,
            map: opt.mapCode, //使用
            data: opt.mapData
        }, dataTwo,
            data
        ]
    };
    console.log(option);
    
    myChart.setOption(option);
    // 添加事件
    myChart.on('click', function (params) {
        if(params.data){
            if(option.graphic.length == 1 && params.data.code != '420000' && option.graphic[0].children[0].style.text == '中国') {
                ElMessage.warning('当前区域暂未开放！')
                return
            }
            getMap(params.data.code).then((mapJson:any)=>{
                echarts.registerMap(params.data.code, mapJson);
                mapReset(myChart, option, params.name, params)
            })
        } else {
            // ElMessage.warning('没有车辆数据！')
        }
    });
    
    
    //当页面变动
    // @ts-ignore
    window.addEventListener('resize', myChart.resize)
    // window.onresize = function (e) {
    //     myChart.resize()
    // };
    
    onUnmounted(() => {
        window.removeEventListener('resize', myChart.resize)
    })
    onDeactivated(() => {
        window.removeEventListener('resize', myChart.resize)
    })
}


const getMap = (code)=>{
    return new Promise((resolve, reject) =>{
        axios.get(`/mapJson/${code}.json`).then(res=>{
            resolve(res.data)
        }).catch(()=>{
            reject()
        })
    })
}

const setLineData = (arr)=>{
    let maxNum = proxy.$_.max(arr)
    pointsRatio[0] =  parseInt(String(maxNum * 0.9))
    pointsRatio[1] =  parseInt(String(maxNum * 0.8))
    points.forEach((item,i)=> {
        if(item.count>=pointsRatio[0]){
            chinaData[i].lineStyle.color = '#FC791C'
            item.symbol = bubbleC
        }else if(item.count<pointsRatio[0] && item.count>=pointsRatio[1]){
            chinaData[i].lineStyle.color = '#75F037'
            item.symbol = bubbleLv
        }else {
            item.symbol = bubble
        }
    })
}

const init = ()=>{
    return new Promise((resolve, reject) =>{
        getMap(100000).then((mapJson)=>{
            getCnAreaVehicleCount({code:areaItem.code}).then(res=>{
                chinaData = []
                points = []
                mapData = []
                let arr = []
                res.countDtoLis.forEach(item=>{
                    let val = areaItem.code == item.code?0: item.count
                    chinaData.push({ value: val,name: item.name, lineStyle: {color: 'rgba(29,253,253, 0.5)'}, coords: [res.value, [item.longitude, item.latitude]]})
                    points.push({ value:[item.longitude, item.latitude], name: item.name, count: val, symbol:'',symbolSize: 1 })
                    mapData.push({ name: item.name, value: val, code: item.code, coords: [item.longitude, item.latitude]})
                    if(areaItem.code != item.code){
                        arr.push(item.count)
                    }
                })
                setLineData(arr)
                resolve(mapJson)
            })
        })
    })
    
}

onActivated(() => {

})

onMounted(() => {
    init().then((mapJson)=>{
        echarts.registerMap('100000', mapJson);
        extendsMap('map', {
            parentCodeName: '中国',       // 地图名
            mapCode: '100000',       // 地图名
            goDown: true,       // 是否下钻
            // 下钻回调
            callback: function (name, option, instance) {
                //
            },
            // 数据展示
            points: points,
            chinaData: chinaData,
            mapData: mapData
        });
    })
})
</script>

<style scoped lang="scss">
.map-center {
    height: calc(100% - 180px);
    margin-top: 180px
}
</style>
