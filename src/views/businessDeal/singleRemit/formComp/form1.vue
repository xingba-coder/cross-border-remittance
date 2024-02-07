<template>
    <div class="container">
        <div class="header">
            <span class="title">汇款信息</span>
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
        <a-form
            v-show="expand"
            :layout="'vertical'" 
            :model="formState" 
            ref="form" 
            :rules="rules" 
            :scrollToFirstError="true" 
            @validate="anyoneValidate"
        >
            <a-row :gutter="24">
                <a-col :span="6">
                    <a-form-item name="spedTranDate">
                        <template #label>
                            指定交易日期
                            <a-tooltip title="可选择当前日期至未来30天内任意一天" :overlayStyle="{'max-width':'270px'}">
                                <info-circle-outlined style="color: rgba(0, 0, 0, 0.45);margin-left: 4px;margin-top: 2px;" />
                            </a-tooltip>
                        </template>
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
                            <a-radio value="Y">是</a-radio>
                            <a-radio value="N">否</a-radio>
                        </a-radio-group>
                    </a-form-item>
                </a-col>
                <a-col :span="6" v-if="formState.isEuipRmb==='Y'">
                    <a-form-item label="等值人民币金额" name="euipRmbAmt">
                        <a-input
                            v-model:value="formState.euipRmbAmt" 
                            placeholder="请输入"
                            @change="changeRemitAmt"
                            @blur="addThousandsFormat('euipRmbAmt')"
                            @focus="removeThousandsFormat('euipRmbAmt')"
                        />
                    </a-form-item>
                </a-col>
                <a-col :span="6" v-if="formState.isEuipRmb==='N'">
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
                            :options="custActOptions"
                            @change="changeAct('xhAccount')"
                        ></a-select>
                        <div class="ant-form-tip">
                            擅长：asdfjalsd
                        </div>
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
                            :options="custActOptions_gh"
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
                            :options="custActOptions_other"
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
                            :maxlength="66" @blur="blurToUpperCase('remitName')" />
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="汇款人详细地址" name="remitAddr">
                        <a-input v-model:value="formState.remitAddr" placeholder="请输入" show-count
                            :maxlength="remitAddrMaxLength" />
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
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, watchEffect, computed } from 'vue';
import { useDebounceFn } from '@vueuse/core'
import dayjs,{Dayjs} from 'dayjs';
import type { Rule } from 'ant-design-vue/es/form';
import type { SelectProps } from 'ant-design-vue';
import { SaveOutlined, SettingOutlined,InfoCircleOutlined,DownOutlined, UpOutlined } from '@ant-design/icons-vue';
import { validateAmt,numToThousands,thousandsToNum } from "./util";
import {useRemitStore} from '@/stores/singleRemit'

// defineProps 是一个仅 <script setup> 中可用的编译宏命令，并不需要显式地导入。
// 声明的 props 会自动暴露给模板。
// defineProps 会返回一个对象，其中包含了可以传递给组件的所有 props
const props = defineProps({
    currencyList: { type: Array, required: true, default: () => [] },  // 每次父组件更新后，所有的子组件中的 props 都会被更新到最新值
    custActList:{type: Array, required: true, default: () => []},
})
const emit = defineEmits(['updateForm', 'updateComp'])

const expand = ref(true)

const form = ref()
const formState:{[key:string]:any} = reactive({
    spedTranDate: dayjs(new Date()),
    remitCur:'USD', // placeholder 只有在 value = undefined 才会显示，对于其它的 null、0、'' 等等对于 JS 语言都是有意义的值。
    isEuipRmb: 'N',
    euipRmbAmt: '',
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

const remitStore = useRemitStore()
const changeRemitCur = () => {
    console.log(formState.remitCur)
    emit('updateForm', { compName: 'form2', key: 'payeeAccount', value: formState.remitCur })
    // emit('updateComp', { compName: 'form2', key: 'payeeAccount', value: formState.remitCur })
    remitStore.changeRemitCur(formState.remitCur)
}

const disabledDate = (current:Dayjs) => {
    return current < dayjs().subtract(1, 'day') || current > dayjs().add(30, 'day')
}

const remitAmtRef = ref()
// 节流处理
const changeRemitAmt = useDebounceFn(() => {
    form.value.resetFields(['ghAmt', 'otherAccount', 'otherAmt'])
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
const validateInfoMap = new Map()
const anyoneValidate = (name, status, errorMsgs) =>{
    validateInfoMap.set(name,status)
}

// 汇款人名称和地址相加不得超过 99
const remitAddrMaxLength = ref(66)
watchEffect(()=>{
    remitAddrMaxLength.value = formState.remitName && formState.remitName.length>33 ? 33 : 66
})

const blurToUpperCase = (field:string) =>{
    console.log(validateInfoMap.entries())
    if(!validateInfoMap.has(field) || validateInfoMap.get(field)===true){
        formState[field] = String(formState[field]).toUpperCase()
    }
}

const currencyOptions = computed(() =>{
    return props.currencyList.map((item:any) =>{
        return {label:item.value+ '-' +item.label,value:item.value}
    })
})
const custActOptions = computed(() =>{
    return props.custActList.map((item:any) =>{
        // select 框是用 options 模式，必须指定 label 和 value
        item.label = item.actName + ' | ' + item.curCode + ' | ' + item.actNo + ' | ' + item.orgName
        item.value = item.actNo
        return item
    })
})
const custActOptions_gh = computed(() => {
    return custActOptions.value.filter(item => item.orgName==='快船')
})
const custActOptions_other = computed(() => {
    return custActOptions.value.filter(item => item.orgName==='勇士')
})

const changeAct = (field:string) =>{

}

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
</style>
  