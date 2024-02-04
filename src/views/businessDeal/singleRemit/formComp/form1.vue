<template>
    <a-collapse v-model:activeKey="activeKey" collapsible="header">
        <a-collapse-panel key="1" header="汇款信息">
            <a-form
                :layout="'vertical'" 
                :model="formState" 
                ref="form" 
                :rules="rules" 
                :scrollToFirstError="true" 
                @validate="anyoneValidate"
            >
                <a-row :gutter="24">
                    <a-col :span="6">
                        <a-form-item label="指定交易日期" name="spedTranDate">
                            <a-date-picker v-model:value="formState.spedTranDate" placeholder="请选择" :disabledDate="disabledDate"
                                style="width:100%;" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="汇款币种" name="remitCur">
                            <a-select 
                                v-model:value="formState.remitCur" 
                                placeholder="请选择" allowClear show-search
                                :filter-option="filterOption"
                                :options="currencyOptions"
                                @change="changeRemitCur"
                            >
                                <!-- <template #option="{ value, label}">
                                    {{ value+ '-' +label }}
                                </template> -->
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="是否等值人名币" name="isEuipRmb">
                            <a-radio-group v-model:value="formState.isEuipRmb">
                                <a-radio value="1">是</a-radio>
                                <a-radio value="2">否</a-radio>
                            </a-radio-group>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="汇款金额" name="remitAmt" ref="remitAmtRef">
                            <a-input
                                v-model:value="formState.remitAmt" 
                                placeholder="请输入"
                                @change="changeRemitAmt"
                                @blur="addThousandsFormat('remitAmt')"
                                @focus="removeThousandsFormat('remitAmt')"
                            />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="现汇账户" name="xhAccount">
                            <a-select 
                                v-model:value="formState.xhAccount" 
                                placeholder="请选择" allowClear show-search
                                :filter-option="filterOption"
                                :options="currencyOptions"
                                @change="changeRemitCur"
                            ></a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="现汇金额" name="xhAmt">
                            <a-input v-model:value="formState.xhAmt" placeholder="请输入" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="购汇账户" name="ghAccount">
                            <a-select 
                                v-model:value="formState.ghAccount" 
                                placeholder="请选择" allowClear show-search
                                :filter-option="filterOption"
                                :options="currencyOptions"
                                @change="changeRemitCur"
                            ></a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="购汇金额" name="ghAmt">
                            <a-input v-model:value="formState.ghAmt" placeholder="请输入" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="其他账户" name="otherAccount">
                            <a-select 
                                v-model:value="formState.otherAccount" 
                                placeholder="请选择" allowClear show-search
                                :filter-option="filterOption"
                                :options="currencyOptions"
                                @change="changeRemitCur"
                            ></a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="其他金额" name="otherAmt">
                            <a-input v-model:value="formState.otherAmt" placeholder="请输入" />
                        </a-form-item>
                    </a-col>
                    <a-divider style="border-color: #e8e8e8;" dashed />
                    <a-col :span="6">
                        <a-form-item label="组织机构代码" name="orgCode">
                            <a-input v-model:value="formState.orgCode" placeholder="请输入" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="汇款人名称" name="remitName">
                            <a-input v-model:value="formState.remitName" placeholder="请输入" show-count
                                :maxlength="20" @blur="blurToUpperCase('remitName')" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="汇款人详细地址" name="remitAddr">
                            <a-input v-model:value="formState.remitAddr" placeholder="请输入" show-count
                                :maxlength="20" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="汇款人城市" name="remitCity">
                            <a-input v-model:value="formState.remitCity" placeholder="请输入" show-count
                                :maxlength="20" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="汇款人省份" name="remitProvince">
                            <a-input v-model:value="formState.remitProvince" placeholder="请输入" show-count
                                :maxlength="20" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="汇款人国家（地区）" name="remitCountry">
                            <a-input v-model:value="formState.remitCountry" placeholder="请输入" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="汇款人邮编" name="remitPostcode">
                            <a-input v-model:value="formState.remitPostcode" placeholder="请输入" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="6" style="margin-right: 75%;">
                        <a-form-item label="客户业务编号" name="businessCode">
                            <a-input v-model:value="formState.businessCode" placeholder="请输入" show-count
                                :maxlength="20" />
                        </a-form-item>
                    </a-col>
                    <a-divider style="border-color: #e8e8e8;" dashed />
                    <a-col :span="6">
                        <a-form-item label="国内外承担方式" name="payType">
                            <a-select 
                                v-model:value="formState.payType" 
                                placeholder="请选择" allowClear show-search
                                :filter-option="filterOption"
                                :options="currencyOptions"
                                @change="changeRemitCur"
                            ></a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="汇款附言" name="remitMemo">
                            <a-input v-model:value="formState.remitMemo" placeholder="请输入" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <div style="margin-top: 30px;">
                            <a-button type="text">
                                <template #icon>
                                    <SaveOutlined />
                                </template>
                                保存为常用附言
                            </a-button>
                            <a-button type="text">
                                <template #icon>
                                    <SettingOutlined />
                                </template>
                                附言设置
                            </a-button>
                        </div>
                    </a-col>
                </a-row>
            </a-form>
        </a-collapse-panel>
    </a-collapse>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, watchEffect } from 'vue';
import { useDebounceFn } from '@vueuse/core'
import dayjs,{Dayjs} from 'dayjs';
import type { Rule } from 'ant-design-vue/es/form';
import type { SelectProps } from 'ant-design-vue';
import { SaveOutlined, SettingOutlined } from '@ant-design/icons-vue';
import { validateAmt,numToThousands,thousandsToNum } from "./util";

// defineProps 是一个仅 <script setup> 中可用的编译宏命令，并不需要显式地导入。
// 声明的 props 会自动暴露给模板。
// defineProps 会返回一个对象，其中包含了可以传递给组件的所有 props
const props = defineProps({
    currencyList: { type: Array, required: true, default: () => [] },  // 每次父组件更新后，所有的子组件中的 props 都会被更新到最新值
})
const emit = defineEmits(['updateForm', 'updateComp'])

const activeKey = ref(['1']);
const form = ref()
const formState:{[key:string]:any} = reactive({
    spedTranDate: dayjs(new Date()),
    remitCur:'USD', // placeholder 只有在 value = undefined 才会显示，对于其它的 null、0、'' 等等对于 JS 语言都是有意义的值。
    isEuipRmb: '',
    remitAmt: '',
    xhAccount: undefined,
    xhAmt: '',
    ghAccount: undefined,
    ghAmt: '',
    otherAccount: undefined,
    otherAmt: '',
    orgCode: '',
    remitName: '',
    remitAddr: '',
    remitCity: '',
    remitProvince: '',
    remitCountry: '',
    remitPostcode: '',
    businessCode: '',
    payType: '',
    remitMemo: '',
})
const rules: Record<string, Rule[]> = {
    spedTranDate: [{ required: true, trigger: 'change' }],
    remitCur: [{ required: true, trigger: 'change' }],
    isEuipRmb: [{ required: true, trigger: 'change' }],
    remitAmt: [{ required: true, validator: validateAmt, trigger: 'change' }],
    xhAmt: [{ validator: validateAmt, trigger: 'change' }],
    ghAmt: [{ validator: validateAmt, trigger: 'change' }],
    otherAmt: [{ validator: validateAmt, trigger: 'change' }],
};

const changeRemitCur = () => {
    console.log(formState.remitCur)
    if (formState.remitCur === 'USD') {
        emit('updateForm', { compName: 'form2', key: 'remitAmt', value: formState.remitCur })
    } else {
        emit('updateComp', { compName: 'form2', key: 'title', value: formState.remitCur })
    }
}

const disabledDate = (current:Dayjs) => {
    return current < dayjs().subtract(1, 'day') || current > dayjs().add(30, 'day')
}

const remitAmtRef = ref()
// 节流处理
const changeRemitAmt = useDebounceFn(() => {
    form.value.resetFields(['xhAccount', 'xhAmt', 'ghAccount', 'ghAmt', 'otherAccount', 'otherAmt'])
}, 500)
const addThousandsFormat = (field:string) =>{
    formState[field] = numToThousands(formState[field])
}
const removeThousandsFormat = (field:string) =>{
    // 栏位校验通过，再进行转换
    // 获取当前表单项的校验状态，奈何 4.x 没暴露直接获取状态的接口
    if(validateInfoMap.get(field)===true){
        formState[field] = thousandsToNum(formState[field])
    }
}
const blurToUpperCase = (field:string) =>{
    console.log(validateInfoMap.entries())
    if(!validateInfoMap.has(field) || validateInfoMap.get(field)===true){
        formState[field] = String(formState[field]).toUpperCase()
    }
}
const validateInfoMap = new Map()
const anyoneValidate = (name, status, errorMsgs) =>{
    validateInfoMap.set(name,status)
}

const currencyOptions = ref()
watchEffect(() =>{
    currencyOptions.value = props.currencyList.map((item:any) =>{
        return {label:item.value+ '-' +item.label,value:item.value}
    })
})
const filterOption = (input: string, option: any) => {
  return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0 || option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};

defineExpose({
    formState,
    form
})
</script>

<style scoped>
.ant-space {
    width: 100%;
}
.ant-form-item{
    margin-bottom: 12px;
}
.ant-form-item :deep(.ant-form-item-label){
    padding-bottom:4px;
}
</style>
  