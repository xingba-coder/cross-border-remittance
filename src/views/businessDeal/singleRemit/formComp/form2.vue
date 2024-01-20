
<template>
    <a-collapse v-model:activeKey="activeKey" collapsible="header">
        <a-collapse-panel key="1" header="收款信息">
            <a-form :layout="'vertical'" :model="formState">
                <a-row :gutter="24">
                    <a-col :span="6">
                        <a-form-item label="收款人名字">
                            <a-input v-model:value="formState.fieldD" placeholder="请输入" />
                        </a-form-item>
                    </a-col>
                    {{title}}
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
    fieldD: '',
})
let title = ref('')

defineExpose({
    formState,
    title
})

</script>

<style scoped>
.ant-space {
    width: 100%;
}
</style>
  