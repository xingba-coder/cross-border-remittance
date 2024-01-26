
<template>
    <a-collapse v-model:activeKey="activeKey" collapsible="header" style="padding-bottom: 2000px;">
        <a-collapse-panel key="1" header="其他信息">
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
                            <!-- <a-select v-model:value="formState.fieldB" placeholder="请选择" allowClear>
                                <a-select-option v-for="item in currencyList" :key="item.value"
                                    :value="item.value">{{ item.label }}</a-select-option>
                            </a-select> -->
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
import { ref, reactive, onMounted } from 'vue';
import dayjs from 'dayjs';
import { getCurrency } from "@/api/test";

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
  