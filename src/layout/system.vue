<template>
    <el-container class="w h pl0">
        <el-main class="h p0 overflow">
            <TagsView v-show="getRouter?.meta?.tagview !== false"></TagsView>
            <router-view v-slot="{ Component }">
                <transition name="fade-transform" mode="out-in" appear>
                    <keep-alive>
                        <component style="height: calc(100% - 38px)" :is="Component"/>
                    </keep-alive>
                </transition>
            </router-view>
        </el-main>
    </el-container>
</template>


<script setup lang="ts">
import TagsView from "./components/TagsView/index.vue"

const route = useRoute()
const getRouter = computed(() => route)

</script>
<style lang="scss" scoped>

</style>
