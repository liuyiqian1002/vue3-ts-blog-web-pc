<!-- 7 天车辆警情排行（top5） -->
<template>
    <div class="homeTitle w positionTl">
        <div class="tw_clr">
            <div class="tw_cl">
                <svg-icon :icon-class="icon" color="#2AD4FF" size="16px" />
                <span class="ml5 homeTitle-txt">{{title}}</span>
                <el-image class="ml10 pointer" style="width: 16px; height: 16px" :src="detailpage" @click="viewData"></el-image>
            </div>
            <ul class="homeTitle_btns tw_cr" v-if="showRadio">
                <li @click="getData(0)" :class="dateType==0?'active':''" class="pointer homeTitle_btn mr15">日</li>
                <li @click="getData(1)" :class="dateType==1?'active':''" class="pointer homeTitle_btn mr15">周</li>
                <li @click="getData(2)" :class="dateType==2?'active':''" class="pointer homeTitle_btn mr5">月</li>
            </ul>
        </div>
        <div class="homeTitle-bot relative w">
            <span class="homeTitle_block positionTl inline-block"></span>
            <span class="homeTitle_block absolute inline-block"></span>
            <span class="homeTitle_block absolute inline-block"></span>
            <span class="homeTitle_block absolute inline-block"></span>
            <span class="homeTitle_block absolute inline-block"></span>
            <span class="homeTitle_block positionTr inline-block"></span>
        </div>
    </div>
</template>

<script setup lang="ts">
import detailpage from '@/assets/detailpage.gif'
// prettier-ignore
const { title, lists, showRadio, loading, dateType } = defineProps({
    title: { type: String, default: '7 天车辆警情排行（top5）' },
    icon: { type: String, default: 'bingtu' },
    lists: { type: Array, default: () => [] },
    showRadio: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    dateType: { type: Number, default: 1 },
})

let index = $ref(3)
index = dateType

let emits = defineEmits(['changeDate', 'viewData'])
const getData = (val)=>{
    emits('changeDate', val)
}

const viewData = ()=>{
    emits('viewData')
}

onMounted(() => {

})


</script>

<style scoped lang="scss">
    .homeTitle{
        z-index: 2;color: #fff;top: 20px;
        .homeTitle-txt {font-family: 'douyuZt';font-style:oblique;font-size: 12px;margin-top: 3px}
        .homeTitle_btns {
            .homeTitle_btn { color: rgba(31,157,203,1);width: 44px;line-height: 21px;border: 1px solid rgba(32,153,197,1);background: rgba(31,158,204,0.2);text-align: center}
            .active { color: #fff}
        }
        
        .homeTitle-bot {
            height: 4px;background: rgba(31,158,204,0.2);margin-top: 8px;
            .homeTitle_block { height: 4px;}
            .homeTitle_block:nth-child(1) { width: 62px;background: rgba(31,158,204,1);}
            .homeTitle_block:nth-child(2) { width: 4px;left:70px;background: rgba(180,235,255,1);}
            .homeTitle_block:nth-child(3) { width: 4px;left:183px;background: rgba(180,235,255,1);}
            .homeTitle_block:nth-child(4) { width: 17px;right: 60px;background: rgba(255,147,42,0.5);}
            .homeTitle_block:nth-child(5) { width: 17px;right: 32px;background: rgba(39,202,255,0.5);}
            .homeTitle_block:nth-child(6) { width: 17px;background: rgba(39,255,252,0.5);}
        }
    }
    
</style>
