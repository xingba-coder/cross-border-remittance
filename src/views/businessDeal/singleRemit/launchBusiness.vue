
<template>
    <a-space direction="vertical">
        <form1 
            :currencyList = "currencyList"
            @updateForm="updateForm"
            @updateComp="updateComp"
        />
        <form2 
            ref="form2_element"
        />
        <form3 />
    </a-space>
</template>

<script lang="ts" setup>
import { ref ,reactive,onMounted} from 'vue';
import form1 from './formComp/form1.vue'  // 通过 <script setup>，导入的组件都在模板中直接可用。
import form2 from './formComp/form2.vue'
import form3 from './formComp/form3.vue'
import { getCurrency } from "@/api/test";

interface comeinObj{
    compName:String,
    key:String,
    value:String | undefined,
}

const form2_element = ref()

const updateForm = (obj:comeinObj) =>{
    console.log(form2_element.value.formState)
    // 这里是直接通过父组件去改变子组件的值，默认父组件无法访问到使用了 <script setup> 的子组件中的任何东西，所以子组件需要使用 defineExpose 暴露出可以被访问哪些东西
    form2_element.value.formState[obj.key] = obj.value
}
const updateComp = (obj:comeinObj) =>{
    form2_element.value[obj.key] = obj.value
}

let currencyList = ref([])

onMounted(async () => {
    let res = await getCurrency()
    console.log(res)
    if (res.code == 200) {
        currencyList.value = res.data
    }

})

</script>

<style scoped>
.ant-space {
    width: 100%;
}
</style>
  