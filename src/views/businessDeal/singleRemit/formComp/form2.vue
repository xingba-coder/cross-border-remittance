
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
        <a-form v-if="expand" :layout="'vertical'" :model="formState">
            <a-row :gutter="24">
                <a-col :span="6">
                    <a-form-item label="收款人账号">
                        <a-input v-model:value="formState.payeeAccount" placeholder="请输入" />
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <div style="margin-top: 26px;">
                        <a-button type="primary">验证IBAN号</a-button>
                    </div>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="收款人名称">
                        <a-input v-model:value="formState.payeeName" placeholder="请输入" show-count :maxlength="99" />
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="收款人详细地址">
                        <a-input v-model:value="formState.payeeAddr" placeholder="请输入" show-count :maxlength="99" />
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item label="收款人城市">
                        <a-input v-model:value="formState.payeeCity" placeholder="请输入" show-count :maxlength="99" />
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item label="收款人国家（地区）">
                        <a-input v-model:value="formState.payeeCountry" placeholder="请输入" show-count :maxlength="99" />
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item label="收款人开户行名称">
                        <a-input v-model:value="formState.payeeBankName" placeholder="请输入" show-count :maxlength="99" />
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item label="收款人开户行SWIFT Code">
                        <a-input v-model:value="formState.payeeBankSwiftCode" placeholder="请输入" show-count :maxlength="99" />
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item label="收款人开户行地址">
                        <a-input v-model:value="formState.payeeBankAddr" placeholder="请输入" show-count :maxlength="99" />
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item label="收款人开户行清算号">
                        <a-input v-model:value="formState.payeeBankClearNo" placeholder="请输入" show-count :maxlength="99" />
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item label="收款人常驻国家（地区）名称及代码">
                        <a-input v-model:value="formState.payeeCzCountry" placeholder="请输入" show-count :maxlength="99" />
                    </a-form-item>
                </a-col>
                <a-divider style="border-color: #e8e8e8;" dashed />
                <a-col :span="6">
                    <a-form-item label="收款银行之代理行名称">
                        <a-input v-model:value="formState.payeeAgentBankName" placeholder="请输入" show-count :maxlength="99" />
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item label="收款银行之代理行SWIFT Code">
                        <a-input v-model:value="formState.payeeAgentBankSwiftCode" placeholder="请输入" show-count :maxlength="99" />
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="收款银行之代理行地址">
                        <a-input v-model:value="formState.payeeAgentBankAddr" placeholder="请输入" show-count :maxlength="99" />
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item label="收款人开户行在其代理行账号">
                        <a-input v-model:value="formState.payeeAgentBankNo" placeholder="请输入" show-count :maxlength="99" />
                    </a-form-item>
                </a-col>
            </a-row>
        </a-form>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted,inject } from 'vue';
import { DownOutlined, UpOutlined } from '@ant-design/icons-vue';

const { form1_element, form2_element,form3_element } = inject('childComp')

const expand = ref(true)

const formState:{[key:string]:any} = reactive({
    payeeAccount:'',
    payeeName:'',
    payeeAddr:'',
    payeeCity:'',
    payeeCountry:'',
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

// const clickTitle = () =>{
//     console.log(form1_element.value.formState.fieldB)
// }

defineExpose({
    formState
})

</script>

<style scoped lang="less">
.ant-space {
    width: 100%;
}
</style>
  