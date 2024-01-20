
<template>
    <a-collapse v-model:activeKey="activeKey" collapsible="header">
        <a-collapse-panel key="1" header="汇款信息">
            <a-form :layout="'vertical'" :model="formState">
                <a-row :gutter="24">
                    <a-col :span="6">
                        <a-form-item label="指定交易日期">
                            <a-date-picker v-model:value="formState.fieldA" placeholder="请选择" :disabledDate="disabledDate"
                                style="width:100%;" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="汇款币种">
                            <a-select v-model:value="formState.fieldB" placeholder="请选择" allowClear @change="changeRemitCur">
                                <a-select-option v-for="item in currencyList" :key="item.value"
                                    :value="item.value">{{ item.label }}</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="是否等值人名币" name="fieldC">
                            <a-radio-group v-model:value="formState.fieldC">
                                <a-radio value="1">是</a-radio>
                                <a-radio value="2">否</a-radio>
                            </a-radio-group>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="汇款金额">
                            <a-input v-model:value="formState.fieldD" placeholder="请输入" />
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-form>
        </a-collapse-panel>
    </a-collapse>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, watchEffect } from 'vue';
import dayjs from 'dayjs';

// defineProps 是一个仅 <script setup> 中可用的编译宏命令，并不需要显式地导入。
// 声明的 props 会自动暴露给模板。
// defineProps 会返回一个对象，其中包含了可以传递给组件的所有 props
const props = defineProps({
    currencyList:{type:Array,required:true,default:() =>[] },  // 每次父组件更新后，所有的子组件中的 props 都会被更新到最新值
})
const changeRemitCur = () =>{
    console.log(formState.fieldB)
    if(formState.fieldB==='USD'){
        emit('updateForm',{compName:'form2',key:'fieldD',value:formState.fieldB})
    }else{
        emit('updateComp',{compName:'form2',key:'title',value:formState.fieldB})
    }
}

const emit = defineEmits(['updateForm','updateComp'])

// const selfCurList = ref([])
// watchEffect(() =>{
//     selfCurList.value = props.currencyList
// })


const activeKey = ref(['1']);
const formState = reactive({
    fieldA: dayjs(new Date()),
    fieldB: undefined, // placeholder 只有在 value = undefined 才会显示，对于其它的 null、0、'' 等等对于 JS 语言都是有意义的值。
    fieldC: '',
    fieldD: '',
})

const disabledDate = (current) => {
    return current < dayjs().subtract(1, 'day') || current > dayjs().add(30, 'day')
}

</script>

<style scoped>
.ant-space {
    width: 100%;
}
</style>
  