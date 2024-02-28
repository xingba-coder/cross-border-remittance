<template>
	<a-form :layout="'vertical'">
		<a-row :gutter="24">
			<template v-for="schema in schemas" :key="schema.field">
				<a-col :span="6" v-show="schema.toggleShow?expand:true">
					<a-form-item :label="schema.label" v-if="schema.type==='daterange'">
						<a-range-picker v-model:value="formData[schema.field]" style="width:100%;" />
					</a-form-item>
					<a-form-item :label="schema.label" v-else-if="schema.type==='select'">
						<a-select v-model:value="formData[schema.field]" placeholder="请选择">
							<a-select-option v-for="item in schema.list" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
						</a-select>
					</a-form-item>
					<a-form-item :label="schema.label" v-else-if="schema.type==='input'">
						<a-input v-model:value="formData[schema.field]" placeholder="请输入" />
					</a-form-item>
					<a-form-item :label="schema.label" v-else-if="schema.type==='inputrange'">
						<a-input v-model:value="formData[schema.field1]" style="width: 48%;" placeholder="最低金额" />
						<span style="width:4%;text-align: center;display: inline-block;">-</span>
						<a-input v-model:value="formData[schema.field2]" style="width: 48%;" placeholder="最高金额" />
						<!-- 这种写法也可以
							<a-input-group compact>
							<a-input v-model:value="value12" style="width: calc(50% - 14px);" placeholder="最低金额" />
							<a-input v-model:value="value13"
								style="width: 30px; pointer-events: none;background-color: #fff;border-left: 0;" placeholder="~" disabled />
							<a-input v-model:value="value14" style="width: calc(50% - 14px);border-left: 0;" placeholder="最高金额" />
						</a-input-group> -->
					</a-form-item>
				</a-col>
			</template>
			<a-col :span="24" align="center">
				<a-form-item>
					<div>
						<a-button type="primary" style="margin-right: 8px;" @click="search">查询</a-button>
						<a-button style="margin-right: 8px;" @click="reset">重置</a-button>
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
				</a-form-item>
			</a-col>
		</a-row>
	</a-form>
</template>
<script setup lang="ts">
import { ref,reactive, onMounted } from 'vue';
import { UpOutlined, DownOutlined } from '@ant-design/icons-vue';

interface Tschemas{
	[k:string]:any
}
const props = defineProps({
	schemas:{type:Array as () => Tschemas[],default:() => []},
})
// const props = withDefaults(defineProps<Tschemas>(), {
//   schemas: () => []
// })
const emit = defineEmits(['search', 'reset'])

const expand = ref(true)

interface TformData{
	[key: string]: any
}
const formData:TformData = reactive({})

const bindDefaultValue = () =>{
	for (let i = 0; i < props.schemas.length; i++) {
		const ele = props.schemas[i];
		formData[ele.field] = ele.defaultValue
	}
}
const search = () =>{
	emit('search',formData)
}
const reset = () =>{
	bindDefaultValue()
	emit('reset',formData)
}

onMounted(() =>{
	bindDefaultValue()
})

</script>
<style lang="less"></style>