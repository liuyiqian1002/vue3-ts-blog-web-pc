<template>
    <div class="common-layout w h">
        <el-container class="w h">
            <!--      显示头      -->
            <el-header class="layout_head">
                <twHeader @updateDark="updateDark"></twHeader>
            </el-header>
            <!--      书签栏      -->
<!--            <TagsView></TagsView>-->
            <!--      显示内容      -->
            <!--      overflow是因为搜索折叠展开的时候滚动条照成内容移动的兼容代码      -->
            <el-main id="appContent" class="relative w h p0 overflow">
                <router-view v-slot="{ Component }">
                    <transition name="fade-transform" mode="out-in" appear>
                        <keep-alive>
                            <component :is="Component"/>
                        </keep-alive>
                    </transition>
                </router-view>
            </el-main>
        </el-container>
    </div>
</template>

<script setup lang="ts">
import twHeader from "./header/index.vue"

let switchCheck = $ref(useDark())
const updateDark = (val)=>{
    switchCheck = val
}

provide('switchCheck', computed(()=> switchCheck))

</script>

<style lang="scss" scoped>
.layout_head { background: #283059; color: #fff}

</style>
