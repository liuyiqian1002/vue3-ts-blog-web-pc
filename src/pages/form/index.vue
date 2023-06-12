<template>
    <div class="common-layout">
        <tw-form :lists="lists" :rules="rules" :formData="formData" @save="save"></tw-form>
    </div>
</template>

<script setup lang="ts">
    let { lists, rules, formData } = reactive({
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
            {label: '活动时间', key: 'date1', type:'date', placeholder: '选择日期', showPassword: true, disabled: true, size:'',prefixIcon: '', suffixIcon: '', clearable: true, },
            {label: '活动时间', key: 'date1', type:'date', placeholder: '选择日期', showPassword: true, disabled: true, size:'',prefixIcon: '', suffixIcon: '', clearable: true, },
            {label: '活动时间', key: 'date2', type:'time', placeholder: '选择时间', size:'',prefixIcon: '', suffixIcon: '', clearable: true, },
            {label: '即时交付', key: 'delivery', type:'switch',  size:'' },
            {label: '活动类型', key: 'type', type:'checkbox', size:'',  children:[ {label:'在线活动'},{label:'促销活动'},{label:'线下活动'},{label:'品牌活动'}] },
            {label: '资源', key: 'resource', type:'radio', size:'',  children:[ {label:'资源'},{label:'场所'}] },
        ],
        // rules: {
        //     name: [
        //         { required: true, message: '请输入活动名称', trigger: 'blur' },
        //         { min: 3, max: 15, message: '长度为3 ~ 15', trigger: 'blur' },
        //     ],
        //     region: [
        //         {required: true, message: '请选择活动区域', trigger: 'change',},
        //     ],
        //     count: [
        //         {required: true, message: '请选择活动次数', trigger: 'change',},
        //     ],
        //     date1: [
        //         {type: 'date', required: true, message: '请选择日期', trigger: 'change',},
        //     ],
        //     date2: [
        //         {type: 'date', required: true, message: '请选择时间', trigger: 'change',},
        //     ],
        //     type: [
        //         {type: 'array', required: true, message: '请选择至少一种活动类型', trigger: 'change',},
        //     ],
        //     resource: [
        //         {required: true, message: '请选择活动资源', trigger: 'change',},
        //     ],
        //     desc: [
        //         { required: true, message: '请输入活动表单', trigger: 'blur' },
        //     ],
        // }
    })
    
    const save = (data)=> {

    }
    
</script>

<style scoped lang="scss">

</style>
