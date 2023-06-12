<template>
    <div class="qwe">
        <el-dialog v-model="drawerFlag" title="报警趋势（区域）">
            <div class="homeTitle-bot relative w">
            <span class="homeTitle_block positionTl inline-block"></span>
            <span class="homeTitle_block absolute inline-block"></span>
            <span class="homeTitle_block absolute inline-block"></span>
            <span class="homeTitle_block absolute inline-block"></span>
            <span class="homeTitle_block absolute inline-block"></span>
            <span class="homeTitle_block positionTr inline-block"></span>
        </div>
            <ul class="homeTitle_btns tw_cl mb10">
                <li @click="getData(0)" :class="dateType==0?'active':''" class="pointer homeTitle_btn">日</li>
                <li @click="getData(1)" :class="dateType==1?'active':''" class="pointer homeTitle_btn">周</li>
                <li @click="getData(2)" :class="dateType==2?'active':''" class="pointer homeTitle_btn">月</li>
            </ul>
            <div class="provinceScreen">
              <el-table :data="gridData" size="mini"  height="435" stripe :header-cell-style="{ background: 'rgba(6,85,105,0.3)', color: 'rgba(42, 212, 255, 1)', textAlign: 'center', fontSize: '12px', padding: '4px', }" style="width: 100%" row-style="test">
                <el-table-column prop="name" label="组织区域" sortable class-name="s-c-c"/>
                <el-table-column prop="date" label="报警日期" sortable class-name="s-c-c"/>
                <el-table-column prop="alarmCount" label="区域报警数" sortable class-name="s-c-c" />
                <el-table-column prop="totalAlarmCount" label="报警总次数" sortable class-name="s-c-c" />
                <el-table-column prop="rate" label="报警占比" sortable class-name="s-c-c">
                <template #default="{ row }">{{ (row.rate * 100).toFixed(2) }}%</template>
              </el-table-column>
             </el-table>
            </div>
        </el-dialog>
    </div>
</template>
  
  <script lang="ts" setup>
import { getHomePageAreaAlarmListDto } from '@/api/home/homepagepopup'
const {dateType, areaId} = defineProps({
    dateType: { type: Number, default: 0 },
    areaId: Number
})

const form = reactive({
    alarmCount: '',
    date: '',
    name: '',
    rate: '',
    totalAlarmCount: '',
})
let gridData = $ref([])
let drawerFlag = $ref(false)
let emits = defineEmits(['update:dateType'])
const getData = (val)=>{
    emits('update:dateType', val)
    localalarmData(val)
}


const localalarmData = (val) => {
    const loading = ElLoading.service({
        lock: true,
        text: '加载中...',
        background: 'rgba(0, 0, 0, 0.7)',
    })
    getHomePageAreaAlarmListDto({areaId: areaId, searchType	: val || 0}).then(res=>{
        loading.close()
        gridData = res
        drawerFlag = true
    }).catch(()=>{
        loading.close()
    })
}
defineExpose({ localalarmData })
</script>
<style scoped lang="scss">
.qwe {
    .homeTitle-txt {font-family: 'douyuZt';font-style:oblique;font-size: 12px;margin-top: 3px}
        .homeTitle_btns {
            //color: rgba(31,157,203,1);
            .homeTitle_btn {  color: rgba(255,255,255,0.3);width: 33.3333%;line-height: 21px;background: rgba(31,158,204,0.2);text-align: center}
            .active { color: #fff}
        }
    :deep(.el-dialog) {
        border: 1px solid rgba(108, 128, 151, 0.5);
        background: url("@/assets/images/mh_bg.png");
        position: relative;
        &:after { content: ''; display: block;position: absolute;top: 0;left: 0;width: 100%; height: 100%;backdrop-filter: blur(3px);z-index: -1}
        .el-dialog__title { color: rgba(226, 235, 241, 1); font-size: 16px; font-family: "douyuZt"; font-style: oblique;}
        .el-dialog__header { padding-bottom: 0; }
        .el-dialog__body{ padding-top: 0; }
        .homeTitle-bot {
            height: 2px;background: rgba(31,158,204,0.2);margin-top: 10px;margin-bottom: 10px;
            .homeTitle_block { height: 2px;}
            .homeTitle_block:nth-child(1) { width: 62px;background: rgba(31,158,204,1);}
            .homeTitle_block:nth-child(2) { width: 2px;left:70px;background: rgba(180,235,255,1);}
            .homeTitle_block:nth-child(3) { width: 2px;left: 450px;;background: rgba(180,235,255,1);}
            .homeTitle_block:nth-child(4) { width: 17px;right: 60px;background: rgba(255,147,42,0.5);}
            .homeTitle_block:nth-child(5) { width: 17px;right: 32px;background: rgba(39,202,255,0.5);}
            .homeTitle_block:nth-child(6) { width: 17px;background: rgba(39,255,252,0.5);}
        }
        .provinceScreen {
            // 滚动条样式
            .el-scrollbar__bar.is-vertical>div{ width: 4px; border-radius: 4px; background: rgba(39,202,255,0.8); }
            .el-table { background: rgba(71, 138, 138, 0); }
            .el-table tr { background: rgba(10, 16, 28, 0.4); background-color: transparent !important; border: none; }
            /**改变表格内行线颜色*/
            .el-table td,.el-table th.is-leaf { border-bottom: 1px solid rgba(108, 128, 151, 0.5) !important; }
            .el-table--border .el-table__inner-wrapper::after,.el-table--border::after,.el-table--border::before,
            .el-table__inner-wrapper::before { background: rgba(108, 128, 151, 0.5); }
            .el-table td.el-table__cell div { color: rgba(208, 222, 238, 1); }
            .el-table--enable-row-transition .el-table__body td,.el-table .cell { font-size: 12px; text-align: center; background-color: transparent !important; }
        }
    }
}
</style>
