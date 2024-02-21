
<template>
    <a-space direction="vertical" style="margin-bottom: 8px;">
        <form1
            ref="form1_element"
            :currencyList = "currencyList"
            :custActList = "custActList"
            @updateForm="updateForm"
            @updateComp="updateComp"
        />
        <form2 
            ref="form2_element"
            :countryList="countryList"
        />
        <form3
            :custActList = "custActList"
            :tradeCodeList = "tradeCodeList"
            ref="form3_element"
        />
    </a-space>
    <div class="footer">
        <a-row>
            <a-col :span="4">
                <a-button>返回</a-button>
            </a-col>
            <a-col :span="8" :offset="12" class="actionBtn">
                <a-button style="background-color: #ff9c00;border-color: #ff9c00;color: #fff;">保存</a-button>
                <a-button type="primary" @click="submitThis">提交</a-button>
                <a-button>重置</a-button>
            </a-col>
        </a-row>
    </div>
</template>

<script lang="ts" setup>
import { ref ,reactive,onMounted,provide} from 'vue';
import form1 from './formComp/form1.vue'  // 通过 <script setup>，导入的组件都在模板中直接可用。
import form2 from './formComp/form2.vue'
import form3 from './formComp/form3.vue'
import { getCurrency,getCustActInfo,getCountryList,getTradeCode } from "@/api/test";
import type { SelectProps } from 'ant-design-vue';

interface comeinObj{
    compName:String,
    key:String,
    value:String | undefined,
}

const form1_element = ref()
const form2_element = ref()
const form3_element = ref()

const updateForm = (obj:comeinObj) =>{
    console.log(form2_element.value.formState)
    // 这里是直接通过父组件去改变子组件的值，默认父组件无法访问到使用了 <script setup> 的子组件中的任何东西，所以子组件需要使用 defineExpose 暴露出可以被访问哪些东西
    form2_element.value.formState[obj.key] = obj.value
}
const updateComp = (obj:comeinObj) =>{
    form2_element.value[obj.key] = obj.value  // 当父组件通过模板引用获取到了该组件的实例时，里面的ref 会自动解包
}

const submitThis = () =>{
    form1_element.value.form.validate()
    form2_element.value.form.validate()
    form3_element.value.form.validate()
}

let currencyList = ref<SelectProps['options']>([])
const getCurrencyFn = async() =>{
    let res = await getCurrency()
    if (res.code == 200) {
        currencyList.value = res.data
    }
}

let custActList = ref<SelectProps['options']>([])
const getCustActInfoFn = async() =>{
    let res = await getCustActInfo()
    if (res.code == 200) {
        custActList.value = res.data
    }
}

let countryList = ref([])
const getCountryListFn = async() =>{
    let res = await getCountryList()
    if (res.code == 200) {
        countryList.value = res.data
    }
}

let tradeCodeList = ref([])
const getTradeCodeFn = async() =>{
    let res = await getTradeCode()
    if (res.code == 200) {
        tradeCodeList.value = res.data
    }
}

onMounted(() => {
    getCurrencyFn()
    getCustActInfoFn()    
    getCountryListFn()    
    getTradeCodeFn()    
})

provide("childComp", { form1_element, form2_element,form3_element });

</script>

<style lang="less">
.ant-space {
    width: 100%;
}
</style>