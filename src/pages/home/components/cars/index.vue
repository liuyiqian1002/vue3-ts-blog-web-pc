<template>
    <div class="w h3333 relative">
        <slot></slot>
        <Circle
        :id="id"
            ref="listscircle"
            :defaultStyle="{ width: '100%', height: '100%' }"
            :loading="loading"
            :element-loading-background="elementLoadingBackground"
        ></Circle>
    </div>
    
</template>

<script setup lang="ts">
import Circle from './components/circle/index.vue'
const {id, loading,elementLoadingBackground } = defineProps({
    id: { type: String, default: 'listscircle' },
    loading: { type: Boolean, default: false },
    elementLoadingBackground: String
})
//  饼图
let listscircle = $ref([])

const update = (list) => {
    listscircle.update(list)
}
defineExpose({ update })




</script>

<style scoped lang="scss">

</style>
