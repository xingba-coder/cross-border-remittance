
<template>
	<div class="container">
		<commonSearch :schemas="schemas" @reset="reset" @search="search" />
		<a-table :columns="columns" :data-source="tableData" size="middle" :scroll="{ x: 1300, y: 1000 }"
			style="margin-top: 8px;">
			<template #headerCell="{ column }">
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
					<a-checkbox-group v-model:value="globalMark" @change="changeGMark" :options="plainOptions">
						<template #label="{ label }">
							<span>{{ label }}</span>
							<a-tooltip title="提示文字" v-if="label==='拒绝'">
									<info-circle-outlined style="color:#d32f2f;position:absolute;top:-5px;right:-5px;" />
							</a-tooltip>
						</template>
					</a-checkbox-group>
				</template>
			</template>
			<template #bodyCell="{ record, column,index }">
				<template v-if="column.key === '1'">
					<a style="text-decoration: underline;" @click="toDetail">SQ_{{record.date}}</a>
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
					<a-checkbox-group v-model:value="record.mark" :options="plainOptions" @change="changeMark(index)" class="borderRadius">
						<template #label="{ label }">
							<span>{{ label }}</span>
						</template>
					</a-checkbox-group>
				</template>
			</template>
		</a-table>
	</div>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import type { TableColumnsType } from 'ant-design-vue';
import { InfoCircleOutlined } from '@ant-design/icons-vue';
import dayjs from 'dayjs';
import commonSearch from '@/components/searchFormTemplate.vue'

const router = useRouter()

const schemas = [
	{ type:'daterange', label:'初次委托日期', field:'agentDate',defaultValue:[]},
	{ type:'daterange', label:'指定交易日期', field:'tradeDate',defaultValue:[]},
	{ type:'select', label:'是否已超期', field:'isOverDate',defaultValue:undefined,list:[{label:'是',value:'Y'},{label:'否',value:'N'}]},
	{ type:'select', label:'经办人', field:'status',defaultValue:undefined,list:[{label:'经办一',value:'handle'},{label:'管理员',value:'admin'}]},
	{ toggleShow:true,type:'input', label:'汇款账户', field:'remitAccount',defaultValue:undefined},
	{ toggleShow:true,type:'inputrange', label:'等值人民币金额', field1:'equalRmbAmt1', field2:'equalRmbAmt2',defaultValue:undefined},
	{ toggleShow:true,type:'select', label:'汇款币种', field:'status',defaultValue:undefined,list:[{label:'人民币',value:'CNY'},{label:'美元',value:'USD'}]},
	{ toggleShow:true,type:'inputrange', label:'汇款金额', field1:'remitAmt1', field2:'remitAmt2',defaultValue:undefined},
	{ toggleShow:true,type:'input', label:'客户申请号', field:'applyNo',defaultValue:undefined},
	{ toggleShow:true,type:'input', label:'收款人账号', field:'receiverAccount',defaultValue:undefined},
	{ toggleShow:true,type:'input', label:'收款人名称', field:'receiverName',defaultValue:undefined},
	{ toggleShow:true,type:'input', label:'客户业务编号', field:'businessNo',defaultValue:undefined},
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

const plainOptions = [
  { label: '通过', value: '1' },
  { label: '退回', value: '2' },
  { label: '拒绝', value: '3' },
];

const columns: TableColumnsType = [
	{ title: '客户申请号', dataIndex: 'date', key: '1' },
	{ title: '初次委托日期', dataIndex: 'address', key: '2' },
	{ title: 'Column 3', dataIndex: 'address', key: '3' },
	{ title: 'Column 4', dataIndex: 'address', key: '4' },
	{ title: '其他账户', dataIndex: 'address', key: '5' },
	{ title: '等值人民币金额', dataIndex: 'address', key: '6' },
	{ title: 'Column 7', dataIndex: 'address', key: '7' },
	{
		title: '操作',
		key: 'operation',
		fixed: 'right',
		width: 230,
	},
];
interface DataItem {
	key: string|number;
	date: string|number;
	name: string;
	age: number;
	mark: Array<string>;
	address: string;
}
const tableData = ref<DataItem[]>([]);
for (let i = 0; i < 3; i++) {
	tableData.value.push({ key: i,date:dayjs(new Date()).format('YYYYMMDD'), name: `zh&m ${i}`, age: 32, address: `London, Park Lane no. ${i}`, mark:[]});
}

let prevGMark:string[] = []
let globalMark = ref<string[]>([])

// 全选
const changeGMark = () =>{
	console.log(globalMark.value)
	let mark = globalMark.value
	let len = globalMark.value.length
	if(len>1){
		globalMark.value = prevGMark.concat(mark).filter(x => !prevGMark.includes(x) || !mark.includes(x))
	}
	prevGMark = globalMark.value
	
	for (let i = 0; i < tableData.value.length; i++) {
		let ele = tableData.value[i];
		ele.mark = globalMark.value
		prevMark[i] = globalMark.value // 全选时，临时数据也应该被赋值
	}
}

let prevMark:{[key:string|number]:string[]} = {} // 临时数组，保存上一次选中的值，用来和当前值进行取差集操作
const changeMark = (index:number) =>{
	if(!prevMark[index]){
		prevMark[index] = []
	}
	let mark = tableData.value[index].mark
	let len = tableData.value[index].mark.length
	if(len>1){
		tableData.value[index].mark = prevMark[index].concat(mark).filter(x => !prevMark[index].includes(x) || !mark.includes(x))
	}
	prevMark[index] = tableData.value[index].mark

	checkGMarkShoudBeSelected()
}

// 当表格中每项都被标记相同的操作，则头部的全选按钮对应的操作也需要被选中
const checkGMarkShoudBeSelected = () =>{
	if(tableData.value.length>0){

		let firstMark = tableData.value[0].mark
		if(tableData.value.some((item) => item.mark.toString()!==firstMark.toString())){
			globalMark.value = []
			prevGMark = []
		}else{
			globalMark.value = firstMark
			prevGMark = firstMark
		}
	}
}

const toDetail = () =>{
	router.push({ name: 'singleCheckDetail' })
}

</script>
<style lang="less" scoped>
.borderRadius :deep(.ant-checkbox .ant-checkbox-inner){
	border-radius:50%;
}
.borderRadius:hover :deep(.ant-checkbox .ant-checkbox-inner){
	border-radius:50%;
}
</style>
  