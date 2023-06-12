<template>
    <div class="statistics pt20 positionTc" v-loading="loading" :element-loading-background="elementLoadingBackground" ref="operRef">
        <!-- ------------------中间统计-------------------------- -->
        <div class="centre-top-layout pt5">
            <ul class="statistics_head tw_clr">
                <li v-for="(item, i) in listst" :key="i" class="tw_blr" @click="tapCar(item)">
                    <svg-icon color="rgb(44,199,241)" size="24px" :icon-class="item.icon"></svg-icon>
                    <div class="">
                        <div class="statistics_txt title">{{item.title}}</div>
                        <div class="statistics_num pointer title">
                            <countTo :startVal='0' :endVal='data[item.key]' :duration='duration'></countTo>
                        </div>
                    </div>
                </li>
                <li class="tw_blr">
                    <svg-icon color="rgb(44,199,241)" size="24px" icon-class="zaixianlv"></svg-icon>
                    <div class="">
                        <div class="statistics_txt title">实时在线率</div>
                        <div class="statistics_num pointer title">{{data.vehicleOnLineRate || 0}}</div>
                    </div>
                </li>
            </ul>
            <ul class="statistics_bot pt20 tw_clr">
                <li v-for="(item, i) in data.vehicleOperateTypeCountDtoList" @click="tapCar(item)" :key="i" class="tw_blr">
                    <svg-icon class-name="bot_icon" color="rgb(44,199,241)" size="22px" :icon-class="dataLists[item.operateTypeCode].icon"></svg-icon>
                    <div class="">
                        <div class="statistics_txt title">{{ item.operateTypeName }}</div>
                        <div class="statistics_num pointer title">
                            <countTo  :startVal='0' :endVal='item.vehicleCount' :duration='duration'></countTo>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <!-- <operator ref="operatorRef"></operator> -->
    </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import countTo from '../counTo/vue-countTo.vue';
const { id, data, loading, elementLoadingBackground } = defineProps({
    id: { type: String, default: 'container' },
    data: { type: Object, default: ()=> {
        return {onLineCount : 146, totalCount:17656, vehicleOnLineRate:"0.83%", vehicleOperateTypeCountDtoList:[]}
        }
    },
    loading: { type: Boolean, default: false },
    elementLoadingBackground: String
})
let duration = $ref(2000)
let listst = $ref([
    { icon:'zongsu', title: '车辆总数', val: 266.64, key:'totalCount'},
    { icon:'zaixianshu', title: '实时在线数', val: 10086, key:'onLineCount'},
])
let dataLists = $ref({
    10: {icon:'lvyou'},
    11: {icon:'banxian'},
    20: {icon:'puhuo'},
    30: {icon:'weiyun'},
})

let emits = defineEmits(['viewData'])
const tapCar = (item)=>{
    emits('viewData', item)
}

onMounted(() => {
})
</script>
<style scoped lang="scss">
.centre-top-layout {
    width: 62%;margin: 0 auto;color: rgba(42,212,255,1);font-family: 'Arial Normal', 'Arial', sans-serif;min-height: 153px;
    :deep(.el-icon) { padding-bottom: 8px}
    :deep(.bot_icon) { padding-bottom: 2px}
    .statistics_txt { line-height: 18px;padding-bottom: 4px;font-size: 12px;}
    .statistics_head {
        .statistics_num {            font-family: Alternate;
            background: url("@/assets/images/homepage/countbj1.png") no-repeat;background-size: 100%; width: 102px;line-height: 38px;font-size: 20px;}
    }
    .statistics_bot {
        .statistics_num {             font-family: Alternate;
            background: url("@/assets/images/homepage/countbj1.png") no-repeat;background-size: 100%; width: 102px;line-height: 26px; font-size: 18px;}
    }
}
</style>
