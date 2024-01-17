<template>
    <a-space direction="vertical">
        <a-collapse v-model:activeKey="activeKey" collapsible="header">
            <a-collapse-panel key="1" header="This panel can only be collapsed by clicking text">
                <a-form :layout="'vertical'" :model="formState">
                    <a-row :gutter="24">
                        <a-col :span="6">
                            <a-form-item label="指定交易日期">
                                <a-date-picker v-model:value="formState.fieldA" placeholder="请选择" style="width:100%;" />
                            </a-form-item>
                        </a-col>
                        <a-col :span="6">
                            <a-form-item label="汇款币种">
                                <a-select v-model:value="formState.fieldB" placeholder="请选择">
                                    <a-select-option value="shanghai">Zone one</a-select-option>
                                    <a-select-option value="beijing">Zone two</a-select-option>
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
        <a-collapse v-model:activeKey="activeKey" collapsible="header">
            <a-collapse-panel key="2" header="This panel can only be collapsed by clicking icon">

            </a-collapse-panel>
        </a-collapse>
    </a-space>
</template>

<script lang="ts" setup>
import { ref ,reactive} from 'vue';

const activeKey = ref(['1', '2']);
const formState = reactive({
    fieldA:'',
    fieldB:'',
    fieldC:'',
    fieldD:'',
})

</script>

<style scoped>
.ant-space {
    width: 100%;
}
</style>
  