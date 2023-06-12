<template>
    <!-- 表格头部 操作按钮 -->
    <div class="table-header">
        <div class="header-button-lf">
            <slot name="tableHeader"></slot>
        </div>
<!--        <div class="header-button-ri" v-if="toolButton">-->
<!--            <el-button :icon="Refresh" circle @click="getTableList"></el-button>-->
<!--            <el-button :icon="Operation" circle @click="openColSetting"></el-button>-->
<!--            <el-button :icon="Search" circle v-if="searchColumns.length"-->
<!--                       @click="isShowSearch = !isShowSearch"></el-button>-->
<!--        </div>-->
    </div>
    <el-table
        border
        :header-cell-style="{'background-color':'#f5f7fa',color:'#333',height:'60px','text-align': 'center'}"
        :cell-style="{ 'text-align': 'center' }"
        :data="tableList"
        height="700"
        center
        style="width: 100%"
    >
        <template
            v-for="(item,index) in tableColumns"
            :key="index"
        >
            <el-table-column
                v-if="item.type == 'selection' || item.type == 'index'"
                :type="item.type"
                resizable
                :reserve-selection="item.type == 'selection'"
                :label="item.label"
                :width="item.width"
                :fixed="item.fixed"
            />
            
            <el-table-column
                v-else
                resizable
                show-overflow-tooltip
                :prop="item.prop"
                :type="item.type"
                :label="item.label"
                :width="item.width"
                :fixed="item.fixed"
            >
                <!-- 自定义 header (使用组件渲染 tsx 语法) -->
                <template #header v-if="item.renderHeader">
                    <component :is="item.renderHeader" :row="item"></component>
                </template>
                
                <!-- 自定义配置每一列 slot（使用作用域插槽） -->
                <template #default="scope">
                    <slot :name="item.prop" :row="scope.row">
						<span>
							{{ scope.row[item.prop] }}
						</span>
                    </slot>
                </template>
            </el-table-column>
        </template>
    
    </el-table>
</template>

<script setup lang="ts">
import {ColumnProps} from './interface'

interface ProTableProps { //公共的 列表props
    columns: Partial<ColumnProps>[];
    // requestApi: (params: any) => Promise<any>;
    dataCallback?: (data: any) => any;
    tableList?: []
}

const props = withDefaults(defineProps<ProTableProps>(), {
    columns: () => [],
    tableList: () => []
})
console.log(props.tableList)
const tableColumns = ref<Partial<ColumnProps>[]>();
// 列表每列的 属性和值
tableColumns.value = props.columns.map(item => {
    return {
        ...item,
        isShow: item.isShow ?? true
    };
});
console.log(tableColumns)
</script>

<style scoped lang="scss">

</style>
