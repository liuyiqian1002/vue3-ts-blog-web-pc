<template>
    <!--新新已改:中间地图-->
    <div className="map-center w">
        <div className="map-city map-city-scale w h" id="map"></div>
    </div>
</template>

<script setup lang="tsx">
import * as echarts from 'echarts';
import {commonApi} from "@/api/common";

let { areaId, areaItem } = defineProps({
    areaId: [Number|| String],
    areaItem: Object
})
let myChart = $ref(null), option = {};
let {proxy} = getCurrentInstance()


let chinaData = []  // 线
let points = []     // 散点
let mapData = []     // 散点


let dataEffectScatter = {
    type: 'effectScatter',
    coordinateSystem: 'geo',
    showEffectOn: 'render',
    zlevel: 1,
    symbol: 'image://data:image/png;base64,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',
    rippleEffect: {
        number: 1, period: 2, scale: 34, brushType: 'fill'
    },
    markPoint: {
        silent: false
    },
    itemStyle: {color: '#1DE9B6', shadowBlur: 0, shadowColor: '#ee0085'},
    symbolSize: 1,
    data: points
} //地图线的动画效果
let dataLines = {
    type: 'lines',
    zlevel: 2,
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
import {getCnAreaVehicleCount} from "../../../../api/home";
import axios from "axios";

const extendsMap = (id, opt) => {
    let map = document.getElementById(id),
        myChart = echarts.init(map);

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
    var line = [[0, 0], [4, 5], [0, 10]];
// style
    let style = {
        font: '18px "Microsoft YaHei", sans-serif',
        textColor: '#eee',
        shadowBlur: 10,
        shadowColor: '#eee',
    };
    var defaultOpt = {
        parentCodeName: '中国',     // 地图展示
        parentCodeName: 0,
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
    const createBreadcrumb = (n) => {
        let left = 0
        if (option.graphic.length > 1){
            left = option.graphic[0].left + (n.length*20 + 100)
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
                    mapReset(myChart, option, n)
                }
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
    const mapReset = (c, o, n) => {
        let breadcrumb = createBreadcrumb(n)
        let j = name.indexOf(n);
        let l = o.graphic.length;
        if (j < 0) {
            o.graphic.push(breadcrumb);
            name.push(n);
        } else {
            o.graphic.splice(j + 1, l);
            name.splice(j + 1, l);
            pos.leftCur -= pos.leftPlus * (l - j - 1);
        }
        
        o.geo.map = n;
        o.geo.zoom = 0.2;
        o.series[0].zoom = 0.2
        o.series[0].map = n
        if (n == '武汉市') {
            let areaData = [{"name": "江汉区", "value": [114.270867, 30.601475, 32994]}, {
                "name": "江岸区",
                "value": [114.30911, 30.600052, 2662]
            }, {"name": "硚口区", "value": [114.21492, 30.582202, 1431]}, {
                "name": "武昌区",
                "value": [114.31665, 30.554408, 1160]
            }, {"name": "汉南", "value": [114.084597, 30.308829, 1101]}, {
                "name": "江夏区",
                "value": [114.319097, 30.376308, 10650]
            }]
            o.visualMap = {
                min: 0,
                max: 1000,
                show: false,
                inRange: {color: ['#50a3ba', '#eac736', '#d30014']},
                textStyle: {color: '#fff'}
            }
            o.series[2] = {}
            o.series[1] = {
                name: '热图',
                type: 'heatmap',
                coordinateSystem: 'geo',
                data: areaData
            }
            o.series[0].label.show = false
            
        } else {
            o.series[0].label.show = true
            let data = proxy.$_.cloneDeep(dataLines)
            let dataTwo = proxy.$_.cloneDeep(dataEffectScatter)
            data.data = chinaData
            dataTwo.data = points
            o.series[1] = dataTwo
            o.series[2] = data
        }
        c.clear();
        c.setOption(o, true);
        zoomAnimation();
        opt.callback(n, o, c);
    }
    
    let data = proxy.$_.cloneDeep(dataLines)
    let dataTwo = proxy.$_.cloneDeep(dataEffectScatter)
    data.data = opt.chinaData
    dataTwo.data = opt.points
    option = {
        tooltip: {
            trigger: 'item',
            formatter: proxy.$_.throttle((params)=> {
                console.log(params);
                if(params.value){
                    return `${params.name}: ${params.value}`
                }
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
                onclick: function () {
                    mapReset(myChart, option, opt.parentCodeName);
                }
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
            map: opt.parentCodeName,
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
                    colorStops: [
                        {offset: 0, color: '#09132c' /* 0% 处的颜色 */},
                        {offset: 1, color: '#274d68'  /* 100% 处的颜色 */}
                    ],
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
                label: {show: false}
            },
            regions: [{
                name: '南海诸岛',
                itemStyle: {
                    areaColor: 'rgba(0, 10, 52, 1)',
                    borderColor: 'rgba(0, 10, 52, 1)',
                    opacity: 0,
                    label: {show: false, color: "#009cc9",}
                },
            }],
        },
        series: [
            {
                type: 'map',
                roam: false,
                label: {show: true, color: '#fff', fontSize: '10px'},
                itemStyle: {shadowBlur: 20, shadowColor: '#4A9FE8', borderColor: 'rgb(74, 206, 232)', areaColor: '#0b66a9'},
                emphasis: {show: false, color: '#fff', areaColor: '#fff', shadowColor: 'rgb(12,25,50)',},
                zoom: 1,
                map: opt.parentCodeName, //使用
                data: opt.mapData
            },
            dataTwo,
            data
        ]
    };
    
    myChart.setOption(option);
    // 添加事件
    myChart.on('click', function (params) {
        console.log(params);
        if(opt.goDown){
            if ( params.name == '湖北省') {
                echarts.registerMap(params.name, china);
                mapReset(myChart, option, params.name)
            } else if ( params.name == '武汉市') {
                echarts.registerMap(params.name, wuhan);
                mapReset(myChart, option, params.name)
            } else {
                ElMessage.warning('其它区域暂未开放！')
            }
        } else {
            ElMessage.warning('没有下层数据！')
        }
        
    });
    
    //当页面变动
    window.onresize = function (e) {
        myChart.resize()
    };
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

onMounted(() => {
    getMap(areaItem.parentCode).then((mapJson: any)=>{
        getCnAreaVehicleCount({code:areaItem.code}).then(res=>{
            chinaData = []
            points = []
            res.countDtoLis.forEach(item=>{
                chinaData.push({ value: item.count,name: item.name, lineStyle: {color: 'rgba(29,253,253, 0.5)'}, coords: [res.value, [item.longitude, item.latitude]]})
                points.push({ value:[item.longitude, item.latitude], name: item.name })
                mapData.push({ name: item.name, value: item.count, code: item.code, coords: [item.longitude, item.latitude]})
            })
            debugger
            echarts.registerMap(areaItem.parentCode, mapJson);
            extendsMap('map', {
                parentCodeName: areaItem.parentCodeName,       // 地图名
                parentCode: areaItem.parentCode,       // 地图名
                goDown: true,       // 是否下钻
                // 下钻回调
                callback: function (name, option, instance) {
                    console.log(name, option, instance);
                },
                // 数据展示
                points: points,
                chinaData: chinaData,
                mapData: mapData
            });
        })
    })
})
</script>

<style scoped lang="scss">
.map-center {
    height: calc(100% - 180px);
    margin-top: 180px
}
</style>
