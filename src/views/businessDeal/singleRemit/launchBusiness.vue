
<template>
    <a-space direction="vertical">
        <form1
            ref="form1_element"
            :currencyList = "currencyList"
            @updateForm="updateForm"
            @updateComp="updateComp"
        />
        <form2 
            ref="form2_element"
        />
        <form3 
            ref="form3_element"
        />
    </a-space>
    <div class="footer">
        <a-row>
            <a-col :span="4">
                <a-button>返回</a-button>
            </a-col>
            <a-col :span="8" :offset="12" class="actionBtn">
                <a-button style="background-color: #ff9c00;border-color: #ff9c00;color: #fff;">Button</a-button>
                <a-button type="primary" @click="submitThis">Button</a-button>
                <a-button danger >Button</a-button>
            </a-col>
        </a-row>
    </div>
</template>

<script lang="ts" setup>
import { ref ,reactive,onMounted,provide} from 'vue';
import form1 from './formComp/form1.vue'  // 通过 <script setup>，导入的组件都在模板中直接可用。
import form2 from './formComp/form2.vue'
import form3 from './formComp/form3.vue'
import { getCurrency } from "@/api/test";
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

let currencyList = ref<SelectProps['options']>([])

const submitThis = () =>{
    form1_element.value.form.validate()
}

onMounted(async () => {
    let res = await getCurrency()
    console.log(res)
    if (res.code == 200) {
        currencyList.value = res.data
    }
    
})

provide("childComp", { form1_element, form2_element,form3_element });

</script>

<style scoped>
.ant-space {
    width: 100%;
}
.footer{
    width:100%;
    position:sticky;
    bottom:0;
    padding:16px 0;
    box-shadow: 0 -1px 7px 0 #e0e0e0;
    .actionBtn{
        text-align: right;
        .ant-btn{
            & + .ant-btn{
                margin-left:8px;
            }
        }
    }
}
</style>
  