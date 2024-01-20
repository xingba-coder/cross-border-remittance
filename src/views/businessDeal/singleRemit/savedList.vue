
<template>
    <a-form :layout="'vertical'" :model="formState">
        <a-row :gutter="16">
            <a-col :span="6">
                <a-form-item label="初次委托日期">
                    <a-range-picker v-model:value="formState.fieldA" />
                </a-form-item>
            </a-col>
            <a-col :span="6">
                <a-form-item label="Field A">
                    <a-range-picker v-model:value="formState.fieldB" />
                </a-form-item>
            </a-col>
            <a-col :span="6">
                <a-form-item label="Field A">
                    <a-input v-model:value="formState.fieldC" placeholder="input placeholder" />
                </a-form-item>
            </a-col>
            <a-col :span="6">
                <a-form-item label="label">
                    <a-select v-model:value="formState.region" placeholder="请选择">
                        <a-select-option value="shanghai">Zone one</a-select-option>
                        <a-select-option value="beijing">Zone two</a-select-option>
                    </a-select>
                </a-form-item>
            </a-col>
        </a-row>
        <a-form-item :wrapper-col="btnWrapperCol">
            <a-button type="primary">Submit</a-button>
        </a-form-item>
    </a-form>
    <a-table :row-selection="rowSelection" :columns="columns" :data-source="tableData" size="middle"
        :scroll="{ x: 1300, y: 1000 }">
        <template #bodyCell="{ record, column }">
            <template v-if="column.key === 'operation'">
                <a @click="dealThis(record)">处理</a>
                <a @click="deleteThis(record)" style="color:#f81d22;">删除</a>
            </template>
        </template>
    </a-table>
    <contextHolder />
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { computed, reactive, h } from 'vue';
import type { UnwrapRef } from 'vue';
import type { TableColumnsType } from 'ant-design-vue';
import { Modal } from 'ant-design-vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
const [modal, contextHolder] = Modal.useModal();

const router = useRouter()

interface FormState {
    fieldA: Array<[]>;
    fieldB: Array<[]>;
    fieldC: string;
    region: string;
}
// Vue 3 中的一个类型工具，用于取消引用(ref)类型的嵌套。
const formState: UnwrapRef<FormState> = reactive({
    fieldA: [],
    fieldB: [],
    fieldC: '',
    region: '',
});
const btnWrapperCol = { offset: 0 };


const columns: TableColumnsType = [
    { title: 'Full Name', width: 100, dataIndex: 'name', key: 'name', fixed: 'left' },
    { title: 'Age', width: 100, dataIndex: 'age', key: 'age', fixed: 'left' },
    { title: 'Column 1', dataIndex: 'address', key: '1' },
    { title: 'Column 2', dataIndex: 'address', key: '2' },
    { title: 'Column 3', dataIndex: 'address', key: '3' },
    { title: 'Column 4', dataIndex: 'address', key: '4' },
    { title: 'Column 5', dataIndex: 'address', key: '5' },
    { title: 'Column 6', dataIndex: 'address', key: '6' },
    { title: 'Column 7', dataIndex: 'address', key: '7' },
    { title: 'Column 8', dataIndex: 'address', key: '8' },
    {
        title: '操作',
        key: 'operation',
        fixed: 'right',
        width: 100,
    },
];
interface DataItem {
    key: string;
    name: string;
    age: number;
    address: string;
}
const tableData: DataItem[] = [];
for (let i = 0; i < 46; i++) {
    tableData.push({ key: i, name: `zh&m ${i}`, age: 32, address: `London, Park Lane no. ${i}` });
}
const rowSelection: TableProps['rowSelection'] = {
    onChange: (selectedRowKeys: string[], selectedRows: DataType[]) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record: DataType) => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
    }),
};


const dealThis = (record) => {
    router.push({ name: 'singleRemit-launch' })
}
const deleteThis = (record) => {
    modal.confirm({
        title: '确认删除所选项？',
        icon: h(ExclamationCircleOutlined),
        content: '',
        okText: '确认',
        cancelText: '取消',
        onOk() {
            console.log('OK', contextHolder);
        },
        onCancel() {
            console.log('Cancel');
        },
        class: 'test',
    });
}
</script>
  
  