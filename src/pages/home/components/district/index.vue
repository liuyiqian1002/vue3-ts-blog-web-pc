<template>
    <div class="w h3333 relative">
        <slot></slot>
        <Alarmingtrend
            :id="id"
            ref="listsalarmingtrend"
            :defaultStyle="{ width: '100%', height: '100%' }"
            :loading="loading"
            :element-loading-background="elementLoadingBackground"
        ></Alarmingtrend>
    </div>
</template>

<script setup lang="ts">
const { id, loading,elementLoadingBackground } = defineProps({
    id: { type: String, default: 'listsalarmingtrend' },
    loading: { type: Boolean, default: false },
    elementLoadingBackground: String
})
//  饼图
let listsalarmingtrend = $ref(null)

const update = (list) => {
    listsalarmingtrend.update(list)
}
defineExpose({ update })
</script>

<style scoped lang="scss">
</style>
