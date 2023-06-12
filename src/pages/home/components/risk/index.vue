<!-- 7天风险时段 -->
<template>
    <div class="w h3333 relative">
        <slot></slot>
        <Dayriskperiod
            :id="id"
            ref="listsdayriskperiod"
            :defaultStyle="{ width: '100%', height: '100%' }"
            :loading="loading"
            :element-loading-background="elementLoadingBackground"
        ></Dayriskperiod>
    </div>
</template>

<script setup lang="ts">
const { id, loading,elementLoadingBackground } = defineProps({
    id: { type: String, default: 'listsdayriskperiod' },
    loading: { type: Boolean, default: false },
    elementLoadingBackground: String
})
//  饼图
let listsdayriskperiod = $ref([])

const update = (list) => {
    listsdayriskperiod.update(list)
}
defineExpose({ update })
</script>

<style scoped lang="scss">
</style>
