
<template>
    <div class="container">
        <div class="header">
            <div class="title">其他信息</div>
            <a style="font-size: 12px;color:#d32f2f;" @click="expand = !expand">
                <template v-if="expand">
                    <span>收起</span>
                    <UpOutlined />
                </template>
                <template v-else>
                    <span>展开</span>
                    <DownOutlined />
                </template>
            </a>
        </div>
        <a-form v-if="expand" :layout="'vertical'" :model="formState">
            <a-row :gutter="24">
                <a-col :span="6">
                    <a-form-item label="汇款模式" name="remitType">
                        <a-radio-group v-model:value="formState.remitType">
                            <a-radio value="1">Sponsor</a-radio>
                            <a-radio value="2">Venue</a-radio>
                            <a-radio value="3">Venue</a-radio>
                        </a-radio-group>
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item label="是否申报">
                        <a-select v-model:value="formState.isDeclare" placeholder="请选择">
                            <a-select-option value="Y">是</a-select-option>
                            <a-select-option value="N">否</a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item label="付款类型">
                        <a-select v-model:value="formState.payType" placeholder="请选择">
                            <a-select-option value="1">预付款</a-select-option>
                            <a-select-option value="2">货到付款</a-select-option>
                            <a-select-option value="3">退款</a-select-option>
                            <a-select-option value="4">其他</a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="交易编码1">
                        <a-select v-model:value="formState.tradeCode1" placeholder="请选择">
                            <a-select-option value="1">预付款</a-select-option>
                            <a-select-option value="2">货到付款</a-select-option>
                            <a-select-option value="3">退款</a-select-option>
                            <a-select-option value="4">其他</a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item label="相应货币及金额1">
                        <a-input v-model:value="formState.tradeAmt1" addon-before="USD" />
                    </a-form-item>
                </a-col>
                <a-col :span="12" style="margin-right: 50%;">
                    <a-form-item label="交易附言1">
                        <a-input v-model:value="formState.tradeMemo1" show-count :maxlength="20" />
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="交易编码2">
                        <a-select v-model:value="formState.tradeCode2" placeholder="请选择">
                            <a-select-option value="1">预付款</a-select-option>
                            <a-select-option value="2">货到付款</a-select-option>
                            <a-select-option value="3">退款</a-select-option>
                            <a-select-option value="4">其他</a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item label="相应货币及金额2">
                        <a-input v-model:value="formState.tradeAmt2" :addon-before="remitCur" />
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="交易附言2">
                        <a-input v-model:value="formState.tradeMemo2" show-count :maxlength="20" />
                    </a-form-item>
                </a-col>
                <a-divider style="border-color: #e8e8e8;" dashed />
                <a-col :span="6">
                    <a-form-item label="本币款项是否为保税货物项下付款" name="isPay">
                        <a-radio-group v-model:value="formState.isPay">
                            <a-radio value="Y">是</a-radio>
                            <a-radio value="N">否</a-radio>
                        </a-radio-group>
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item label="合同号">
                        <a-input v-model:value="formState.contractNo" show-count :maxlength="20" />
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item label="发票号">
                        <a-input v-model:value="formState.invoiceNo" show-count :maxlength="20" />
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item label="外汇局批件号/备案表号/业务编号">
                        <a-input v-model:value="formState.multiNo" show-count :maxlength="20" />
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="扣费账户" name="kfAccount">
                        <a-select 
                            v-model:value="formState.kfAccount" 
                            placeholder="请选择" allowClear show-search
                            :filter-option="filterOption"
                            :options="custActOptions"
                        ></a-select>
                        <div class="ant-form-tip">
                            擅长：asdfjalsd
                        </div>
                    </a-form-item>
                </a-col>
                <a-col :span="6" style="margin-right: 25%;">
                    <div style="margin-top: 26px;">
                        <a-button type="primary">费用试算</a-button>
                    </div>
                </a-col>
                <a-divider style="border-color: #e8e8e8;" dashed />
                <a-col :span="6">
                    <a-form-item label="申请人姓名">
                        <a-input v-model:value="formState.applyName" show-count :maxlength="20" />
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item label="联系电话">
                        <a-input v-model:value="formState.applyTel" show-count :maxlength="20" />
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item label="接收短信手机号">
                        <a-input v-model:value="formState.applyPhone" show-count :maxlength="20" />
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item label="接收E-MAIL邮箱">
                        <a-input v-model:value="formState.applyEmail" show-count :maxlength="20" />
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item label="税务备案表编号及验证码">
                        <a-input v-model:value="formState.applyCode" show-count :maxlength="20" @focus="focusCode" />
                    </a-form-item>
                </a-col>
            </a-row>
        </a-form>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted,watchEffect,inject, computed } from 'vue';
import { DownOutlined, UpOutlined } from '@ant-design/icons-vue';

const props = defineProps({
    custActList:{type: Array, required: true, default: () => []},
})

const { form1_element } = inject('childComp')

// 这里直接打印获取 form1_element.value 会报错，猜测是加载这里时，form1_element 还没加载完
// console.log(form1_element.value.formState.remitCur) 
// 而通过用户事件触发再去获取能正常获取到
// const focusCode = () =>{
//     console.log(form1_element.value.formState.remitCur) 
// }

// remitCur是兄弟组件属性，通过 inject + computed 获取兄弟组件属性并实时更新本组件的属性，而另一种方式是 pinia；
const remitCur = computed(() =>{
    return form1_element.value?.formState.remitCur
})

const expand = ref(true)

const formState:{[key:string]:any} = reactive({
    remitType:'',
    isDeclare:'Y',
    payType:'',
    tradeCode1:'',
    tradeAmt1:'',
    tradeMemo1:'',
    tradeCode2:'',
    tradeAmt2:'',
    tradeMemo2:'',
    isPay:'',
    contractNo:'',
    invoiceNo:'',
    multiNo:'',
    kfAccount:'',
    applyName:'',
    applyTel:'',
    applyPhone:'',
    applyEmail:'',
    applyCode:'',
})

const filterOption = (input: string, option: any) => {
  return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0 || option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};
const custActOptions = ref()
watchEffect(() =>{
    custActOptions.value = props.custActList.filter((item) => item.orgName==='湖人').map((item:any) =>{
        // select 框是用 options 模式，必须指定 label 和 value
        item.label = item.actName + ' | ' + item.curCode + ' | ' + item.actNo + ' | ' + item.orgName
        item.value = item.actNo
        return item
    })
})

</script>

<style scoped>
.ant-space {
    width: 100%;
}
</style>
  