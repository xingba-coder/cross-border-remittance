
<template>
    <div class="container">
        <!-- <a-space direction="vertical"> -->
            <commonSearch :schemas="schemas" @reset="reset" @search="search" />
            <a-table :columns="columns" :data-source="tableData" size="middle" :scroll="{ x: 1300, y: 1000 }" style="margin-top: 8px;">
                <template #headerCell="{ column }">
                    <template v-if="column.key === '1'">
                        <div>客户申请号</div>
                        <div>批次号</div>
                    </template>
                    <template v-if="column.key === '3'">
                        <div>指定交易日期</div>
                        <div>是否已超期</div>
                    </template>
                    <template v-if="column.key === '4'">
                        <div>现汇账户</div>
                        <div>购汇账户</div>
                    </template>
                    <template v-if="column.key === '7'">
                        <div>汇款币种</div>
                        <div>汇款金额</div>
                    </template>
                </template>
                <template #bodyCell="{ record, column }">
                    <template v-if="column.key === '1'">
                        <div>SQ5678</div>
                        <div>PL1234</div>
                    </template>
                    <template v-if="column.key === '3'">
                        <div>指定交易日期</div>
                        <div>是否已超期</div>
                    </template>
                    <template v-if="column.key === '4'">
                        <div>现汇账户</div>
                        <div>购汇账户</div>
                    </template>
                    <template v-if="column.key === '7'">
                        <div>汇款币种</div>
                        <div>汇款金额</div>
                    </template>
                    <template v-if="column.key === 'operation'">
                        <a @click="toDetail(record)">详情</a>
                    </template>
                </template>
            </a-table>
        <!-- </a-space> -->
    </div>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { reactive, ref } from 'vue';
import type { UnwrapRef } from 'vue';
import type { TableColumnsType } from 'ant-design-vue';
import { UpOutlined,DownOutlined } from '@ant-design/icons-vue';
import commonSearch from '@/components/searchFormTemplate.vue'

const expand = ref(false)

const router = useRouter()

const schemas = [
	{ type:'select', label:'日期类型', field:'dateType',defaultValue:undefined,list:[{label:'是',value:'Y'},{label:'否',value:'N'}]},
	{ type:'daterange', label:'日期范围', field:'tradeDate',defaultValue:[]},
	{ type:'select', label:'是否已超期', field:'isOverDate',defaultValue:undefined,list:[{label:'是',value:'Y'},{label:'否',value:'N'}]},
	{ type:'select', label:'交易状态', field:'tradeStatus',defaultValue:undefined,list:[{label:'是',value:'Y'},{label:'否',value:'N'}]},
	{ type:'input', label:'汇款账户', field:'remitAccount',defaultValue:undefined},
	{ type:'inputrange', label:'等值人民币金额', field1:'equalRmbAmt1', field2:'equalRmbAmt2',defaultValue:undefined},
	{ type:'select', label:'汇款币种', field:'status',defaultValue:undefined,list:[{label:'人民币',value:'CNY'},{label:'美元',value:'USD'}]},
	{ type:'inputrange', label:'汇款金额', field1:'remitAmt1', field2:'remitAmt2',defaultValue:undefined},
	{ toggleShow:true,type:'input', label:'客户申请号', field:'applyNo',defaultValue:undefined},
	{ toggleShow:true,type:'input', label:'批次号', field:'batchNo',defaultValue:undefined},
	{ toggleShow:true,type:'input', label:'汇款编号', field:'remitId',defaultValue:undefined},
	{ toggleShow:true,type:'input', label:'客户业务编号', field:'businessNo',defaultValue:undefined},
	{ toggleShow:true,type:'input', label:'收款人账号', field:'receiverAccount',defaultValue:undefined},
	{ toggleShow:true,type:'input', label:'收款人名称', field:'receiverName',defaultValue:undefined},
	{ toggleShow:true,type:'select', label:'经办人', field:'status',defaultValue:undefined,list:[{label:'经办一',value:'handle'},{label:'管理员',value:'admin'}]},
	{ toggleShow:true,type:'select', label:'资金追踪', field:'moneyTrack',defaultValue:undefined,list:[{label:'经办一',value:'handle'},{label:'管理员',value:'admin'}]},
	{ toggleShow:true,type:'select', label:'是否存在影像', field:'hasImage',defaultValue:undefined,list:[{label:'经办一',value:'handle'},{label:'管理员',value:'admin'}]},
]

interface TformData{
	[key: string]: any
}
const search = (formData:TformData) =>{
	console.log(formData)
}
const reset = (formData:TformData) =>{
	console.log(formData)
}

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

const columns: TableColumnsType = [
    { title: '', dataIndex: 'address', key: '1'},
    { title: '初次委托日期', dataIndex: 'address', key: '2' },
    { title: 'Column 3', dataIndex: 'address', key: '3' },
    { title: 'Column 4', dataIndex: 'address', key: '4' },
    { title: '其他账户', dataIndex: 'address', key: '5' },
    { title: '等值人民币金额', dataIndex: 'address', key: '6' },
    { title: 'Column 7', dataIndex: 'address', key: '7' },
    { title: 'Column 7', dataIndex: 'address', key: '8' },
    { title: 'Column 7', dataIndex: 'address', key: '9' },
    { title: 'Column 7', dataIndex: 'address', key: '10' },
    { title: 'Column 7', dataIndex: 'address', key: '11' },
    {
        title: '操作',
        key: 'operation',
        fixed: 'right',
        width: 100,
    },
];
interface DataItem {
    key: string|number;
    name: string;
    age: number;
    address: string;
}
const tableData: DataItem[] = [];
for (let i = 0; i < 46; i++) {
    tableData.push({ key: i, name: `zh&m ${i}`, age: 32, address: `London, Park Lane no. ${i}` });
}

const toDetail = (record:DataItem) => {
    console.log(router.currentRoute)
    router.push({ name: 'allSearch-detail' })
}
</script>
<style lang="less">
.container {

    .header {
        padding-bottom: 12px;

        .title {
            display: inline-block;
            padding-left: 10px;
            margin-bottom: 6px;
            font-size: 16px;
            font-weight: bold;
            border-left: 4px solid #d32f2f;
        }

        a {
            margin-left: 4px;

            &:hover {
                background-color: #fff;
            }
        }
    }
}
</style>
  