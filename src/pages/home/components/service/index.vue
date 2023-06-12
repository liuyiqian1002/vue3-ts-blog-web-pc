<template>
    <div class="w h3333 relative">
        <slot></slot>
        <Carsservice
            :id="id"
            ref="listscarsservice"
            :defaultStyle="{ width: '100%', height: '100%' }"
            :loading="loading"
            :element-loading-background="elementLoadingBackground"
        ></Carsservice>
    </div>
</template>

<script setup lang="ts">
const { id, loading,elementLoadingBackground } = defineProps({
    id: { type: String, default: 'listscarsservice' },
    loading: { type: Boolean, default: false },
    elementLoadingBackground: String
})
//  饼图
let listscarsservice = $ref(null)

const update = (list) => {
    listscarsservice.update(list)
}
defineExpose({ update })
</script>

<style scoped lang="scss">
</style>
