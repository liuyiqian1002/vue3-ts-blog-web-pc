<template>
    <div class="table-box">
        <tw-form :lists="lists" :formData="formData" @save="save"></tw-form>
		<TwTable :columns="columns" :tableData="tableData" :tableBnt="tableBnts">
			<!-- 表格操作 -->
			<template #operation="scope">
<!--				<el-button type="primary" link :icon="View" @click="openDrawer('查看', scope.row)">查看</el-button>-->
<!--				<el-button type="primary" link :icon="EditPen" @click="openDrawer('编辑', scope.row)">编辑</el-button>-->
<!--				<el-button type="primary" link :icon="Refresh" @click="resetPass(scope.row)">重置密码</el-button>-->
<!--				<el-button type="primary" link :icon="Delete" @click="deleteAccount(scope.row)">删除</el-button>-->
			</template>
		</TwTable>
    </div>
</template>

<script setup lang="tsx">
import { ColumnProps } from '@/TwTable/interface'
import { getTableList } from '@/api/table'
// 列表数据
const tableData = ref([])
// 自定义渲染头部(使用tsx语法)
const renderHeader = (scope: any) => {
	return (
		<el-button
			type="primary"
			onClick={() => {
				ElMessage.success("我是自定义表头");
			}}
		>
			{scope.row.label}
		</el-button>
	);
};
// 表格配置项
const columns: Partial<ColumnProps>[] = [
	// { type: "selection", width: 80, fixed: "left" },
	// { type: "index", label: "#", width: 80 },
	// { type: "expand", label: "Expand", width: 100 },
	// { prop: "username", label: "用户姓名", width: 130, search: true, searchProps: { disabled: true }, renderHeader },
	// 😄 enum 可以直接是数组对象，也可以是请求方法(TwTable 内部会执行获取 enum 的这个方法)，下面用户状态也同理
	// 😄 enum 为请求方法时，后台返回的数组对象 key 值不是 label 和 value 的情况，可以在 searchProps 中指定 label 和 value 的 key 值
	{ prop: "id", label: "id", width: 120, sortable: true, search: true, searchType: "select", searchProps: { label: "genderLabel", value: "genderValue" } },
	{ prop: "address", label: "地址", search: true },
	{ prop: "age", label: "年龄", search: true },
	{ prop: "avatar", label: "照片", search: true },
	{ prop: "createTime", label: "创建时间", sortable: true, search: true, searchType: "select", searchProps: { label: "userLabel", value: "userStatus" } },
	{ prop: "gender", label: "性别", width: 200, sortable: true, search: true, searchType: "datetimerange", searchProps: { disabledDate: (time: Date) => time.getTime() < Date.now() - 8.64e7 }, searchInitParam: ["2022-08-30 00:00:00", "2022-08-20 23:59:59"] },
	{ prop: "idCard", label: "身份证", width: 200, sortable: true, search: true, searchType: "datetimerange", searchProps: { disabledDate: (time: Date) => time.getTime() < Date.now() - 8.64e7 }, searchInitParam: ["2022-08-30 00:00:00", "2022-08-20 23:59:59"] },
	{ prop: "status", label: "状态", width: 200, sortable: true, search: true, searchType: "datetimerange", searchProps: { disabledDate: (time: Date) => time.getTime() < Date.now() - 8.64e7 }, searchInitParam: ["2022-08-30 00:00:00", "2022-08-20 23:59:59"] },
	{ prop: "username", label: "名字", width: 200, sortable: true, search: true, searchType: "datetimerange", searchProps: { disabledDate: (time: Date) => time.getTime() < Date.now() - 8.64e7 }, searchInitParam: ["2022-08-30 00:00:00", "2022-08-20 23:59:59"] },
    // { prop: "operation", label: "操作", width: 330, fixed: "right", renderHeader },
];

const tableBnts = { prop: "btns", label: "操作", fixed: "right", btns:[{icon:'iconzhexiantu', name:'折线图', click: (row)=>{ }}] }

// 获取 列表数据接口
getTableList().then((res:any)=>{
    tableData.value = res.datalist
}).catch((err:any)=>{})
// 是否展示更多搜索内容

const small = ref(false)
const disabled = ref(false)
const tipStatus = ref(true)
let { lists, formData } = reactive({
    formData: {
        name: 'Hello',
        region: '',
        count: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
    },
    lists: [
        // {label: '活动名', key: 'name', maxlength: 6, minlength: 2, showWordLimit: true, placeholder: '请输入', showPassword: true, disabled: true, size:'',prefixIcon: '', suffixIcon: '', rows: 2, name: '', readonly: true, resize: true, validateEvent: true, inputStyle: {}, clearable: true},
        {label: '活动名', key: 'name', maxlength: 15, minlength: 3, placeholder: '请输入', clearable: true},
        {label: '活动区域', key: 'region', type:'select', placeholder: '请选择', showPassword: true, disabled: true, size:'',prefixIcon: '', suffixIcon: '', clearable: true, children:[ {label:'上海', value:'shanghai'},{label:'北京', value:'beijing'}] },
        {label: '活动区域', key: 'region', type:'select', placeholder: '请选择', showPassword: true, disabled: true, size:'',prefixIcon: '', suffixIcon: '', clearable: true, children:[ {label:'上海', value:'shanghai'},{label:'北京', value:'beijing'}] },
        {label: '活动时间', key: 'date1', type:'date', placeholder: '选择日期', showPassword: true, disabled: true, size:'',prefixIcon: '', suffixIcon: '', clearable: true, },
        {label: '活动时间', key: 'date2', type:'time', placeholder: '选择时间', size:'',prefixIcon: '', suffixIcon: '', clearable: true, },
        {label: '即时交付', key: 'delivery', type:'switch',  size:'' },
        {label: '活动类型', key: 'type', type:'checkbox', size:'',  children:[ {label:'在线活动'},{label:'促销活动'},{label:'线下活动'}] },
        {label: '资源', key: 'resource', type:'radio', size:'',  children:[ {label:'资源'},{label:'场所'}] },
        {label: '资源', key: 'resource', type:'radio', size:'',  children:[ {label:'资源'},{label:'场所'}] },
    ],
})

</script>

<style scoped lang="scss">

</style>
