<template>
    <div class="common-layout">
        <div class="user_p">
            用户详情页面，这里是详情啊
        </div>
    </div>
</template>

<script setup lang="ts">
    let size = ref('40px')

</script>

<style scoped lang="scss">
//.user_p { font-size: var(--el-font-size-extra-large)}
.user_p { font-size: v-bind(size)}
</style>
