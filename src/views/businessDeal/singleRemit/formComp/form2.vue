
<template>
    <div class="container">
        <div class="header">
            <div class="title">收款信息</div>
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
            <a-alert message="Warning" type="warning" show-icon />
        </div>
        <a-form v-show="expand" :layout="'vertical'" :model="formState" :rules="rules" ref="form">
            <a-row :gutter="24">
                <a-col :span="6">
                    <a-form-item label="收款人账号" name="payeeAccount">
                        <a-input v-model:value="formState.payeeAccount" placeholder="请输入" />
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <div style="margin-top: 26px;">
                        <a-button type="primary">验证IBAN号</a-button>
                    </div>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="收款人名称" name="payeeName">
                        <a-input v-model:value="formState.payeeName" placeholder="请输入" show-count :maxlength="99" />
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="收款人详细地址" name="payeeAddr">
                        <a-input v-model:value="formState.payeeAddr" placeholder="请输入" show-count :maxlength="99" />
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item label="收款人城市" name="payeeCity">
                        <a-input v-model:value="formState.payeeCity" placeholder="请输入" show-count :maxlength="99" />
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item label="收款人国家（地区）">
                        <a-select
                            v-model:value="formState.payeeCountry"
                            placeholder="请选择"
                            show-search
                            :filter-option="filterOption"
                            :options="countryList"
                        >
                        </a-select>
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item label="收款人开户行名称" name="payeeBankName">
                        <a-input v-model:value="formState.payeeBankName" placeholder="请输入" show-count :maxlength="99" />
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item label="收款人开户行SWIFT Code" name="payeeBankSwiftCode">
                        <a-input v-model:value="formState.payeeBankSwiftCode" placeholder="请输入" show-count :maxlength="99" />
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item label="收款人开户行地址" name="payeeBankAddr">
                        <a-input v-model:value="formState.payeeBankAddr" placeholder="请输入" show-count :maxlength="99" />
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item label="收款人开户行清算号" name="payeeBankClearNo">
                        <a-input v-model:value="formState.payeeBankClearNo" placeholder="请输入" show-count :maxlength="99" />
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item label="收款人常驻国家（地区）名称及代码" name="payeeCzCountry">
                        <a-input v-model:value="formState.payeeCzCountry" placeholder="请输入" show-count :maxlength="99" />
                    </a-form-item>
                </a-col>
                <a-divider style="border-color: #e8e8e8;" dashed />
                <a-col :span="6">
                    <a-form-item label="收款银行之代理行名称" name="payeeAgentBankName">
                        <a-input v-model:value="formState.payeeAgentBankName" placeholder="请输入" show-count :maxlength="99" />
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item label="收款银行之代理行SWIFT Code" name="payeeAgentBankSwiftCode">
                        <a-input v-model:value="formState.payeeAgentBankSwiftCode" placeholder="请输入" show-count :maxlength="99" />
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="收款银行之代理行地址" name="payeeAgentBankAddr">
                        <a-input v-model:value="formState.payeeAgentBankAddr" placeholder="请输入" show-count :maxlength="99" />
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item label="收款人开户行在其代理行账号" name="payeeAgentBankNo">
                        <a-input v-model:value="formState.payeeAgentBankNo" placeholder="请输入" show-count :maxlength="99" />
                    </a-form-item>
                </a-col>
            </a-row>
        </a-form>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted,inject, watchEffect, computed } from 'vue';
import { DownOutlined, UpOutlined } from '@ant-design/icons-vue';
import type { Rule } from 'ant-design-vue/es/form';
import {useRemitStore} from '@/stores/singleRemit'

const props = defineProps({
    countryList:{type: Array, required: true, default: () => []},
})
const form = ref()
const expand = ref(true)

const formState:{[key:string]:any} = reactive({
    payeeAccount:'',
    payeeName:'',
    payeeAddr:'',
    payeeCity:'',
    payeeCountry:undefined,
    payeeBankName:'',
    payeeBankSwiftCode:'',
    payeeBankAddr:'',
    payeeBankClearNo:'',
    payeeCzCountry:'',
    payeeAgentBankName:'',
    payeeAgentBankSwiftCode:'',
    payeeAgentBankAddr:'',
    payeeAgentBankNo:'',
    fieldB:'',
})
const rules: Record<string, Rule[]> = reactive({
    payeeAccount: [{ required: true, trigger: 'change' }],
    payeeName: [{ required: true, trigger: 'change' }],
    payeeAddr: [{ required: true, trigger: 'change' }],
    payeeCity: [{ required: true, trigger: 'change' }],
    payeeCountry: [{ required: true, trigger: 'change' }],
    payeeBankName: [{ required: true, trigger: 'change' }],
    payeeCzCountry: [{ required: true, trigger: 'change' }],
    payeeBankClearNo: [{ required: false, trigger: 'change' }],
})

const remitStore = useRemitStore()
watchEffect(() =>{
    let cur = remitStore.remitCur // 监听pinia创建的全局变量
    let code = formState.payeeBankSwiftCode
    // 汇款币种是加元，且code有值且第 5-6 位为CA 且前4位不为 BKCH，则栏位必填
    // 汇款币种是澳元，且code有值且第 5-6 位为AU 且前4位不为 BKCH，则栏位必填
    rules.payeeBankClearNo[0].required = (
        (cur==='CAD' && code && code.substr(4,2)==='CA' && code.substr(0,4)!=='BKCH')
        ||
        (cur==='AUD' && code && code.substr(4,2)==='AU' && code.substr(0,4)!=='BKCH')
    )?true:false
})

const filterOption = (input: string, option: any) => {
  return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0 || option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};

const countryList = computed(() =>{
    return props.countryList.map((item:any) =>{
        // select 框是用 options 模式，必须指定 label 和 value
        item.label = item.countryName + ' | ' + item.countryCode
        item.value = item.countryCode
        return item
    })
})

// const clickTitle = () => name="fieldB"{
//     console.log(form1_element.value.formState.fieldB)
// }

defineExpose({
    formState,
    form
})

</script>

<style scoped lang="less">
.ant-space {
    width: 100%;
}
</style>
  