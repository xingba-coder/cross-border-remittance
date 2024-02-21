
<template>
    <div class="container">
        <a-space direction="vertical">
            <a-form :layout="'vertical'" :model="formState">
                <a-row :gutter="48">
                    <a-col :span="6">
                        <a-form-item label="日期类型">
                            <a-range-picker v-model:value="formState.fieldA" style="width:100%;" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="日期范围">
                            <a-range-picker v-model:value="formState.fieldA" style="width:100%;" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="是否已超期">
                            <a-select v-model:value="formState.region" placeholder="请选择">
                                <a-select-option value="Y">是</a-select-option>
                                <a-select-option value="N">否</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="交易状态">
                            <a-select v-model:value="formState.region" placeholder="请选择">
                                <a-select-option value="Y">是</a-select-option>
                                <a-select-option value="N">否</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="汇款账户">
                            <a-input v-model:value="formState.fieldA" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="等值人民币金额">
                            <!-- <a-input v-model:value="value12" style="width: 48%;" placeholder="最低金额" />
                            <span style="width:4%;text-align: center;display: inline-block;">-</span>
                            <a-input v-model:value="value14" style="width: 48%;" placeholder="最高金额" /> -->
                            <a-input-group compact>
                                <a-input v-model:value="value12" style="width: calc(50% - 14px);" placeholder="最低金额" />
                                <a-input v-model:value="value13" style="width: 30px; pointer-events: none;background-color: #fff;border-left: 0;" placeholder="~" disabled />
                                <a-input v-model:value="value14" style="width: calc(50% - 14px);border-left: 0;" placeholder="最高金额" />
                            </a-input-group>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="汇款币种">
                            <a-select v-model:value="formState.region" placeholder="请选择">
                                <a-select-option value="shanghai">Zone one</a-select-option>
                                <a-select-option value="beijing">Zone two</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-item label="汇款金额">
                            <a-input-group compact>
                                <a-input v-model:value="value12" style="width: calc(50% - 14px);" placeholder="最低金额" />
                                <a-input v-model:value="value13" style="width: 30px; pointer-events: none;background-color: #fff;border-left: 0;" placeholder="~" disabled />
                                <a-input v-model:value="value14" style="width: calc(50% - 14px);border-left: 0;" placeholder="最高金额" />
                            </a-input-group>
                        </a-form-item>
                    </a-col>
                    <template v-if="expand">
    
                        <a-col :span="6">
                            <a-form-item label="客户申请号">
                                <a-input v-model:value="formState.fieldA" />
                            </a-form-item>
                        </a-col>
                        <a-col :span="6">
                            <a-form-item label="批次号">
                                <a-input v-model:value="formState.fieldA" />
                            </a-form-item>
                        </a-col>
                        <a-col :span="6">
                            <a-form-item label="汇款编号">
                                <a-input v-model:value="formState.fieldA" />
                            </a-form-item>
                        </a-col>
                        <a-col :span="6">
                            <a-form-item label="客户业务编号">
                                <a-input v-model:value="formState.fieldA" />
                            </a-form-item>
                        </a-col>
                        <a-col :span="6">
                            <a-form-item label="收款人账号">
                                <a-input v-model:value="formState.fieldA" />
                            </a-form-item>
                        </a-col>
                        <a-col :span="6">
                            <a-form-item label="收款人名称">
                                <a-input v-model:value="formState.fieldA" />
                            </a-form-item>
                        </a-col>
                        <a-col :span="6">
                            <a-form-item label="经办人">
                                <a-select v-model:value="formState.region" placeholder="请选择">
                                    <a-select-option value="shanghai">Zone one</a-select-option>
                                    <a-select-option value="beijing">Zone two</a-select-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :span="6">
                            <a-form-item label="资金追踪">
                                <a-select v-model:value="formState.region" placeholder="请选择">
                                    <a-select-option value="shanghai">Zone one</a-select-option>
                                    <a-select-option value="beijing">Zone two</a-select-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :span="6">
                            <a-form-item label="是否存在影像">
                                <a-select v-model:value="formState.region" placeholder="请选择">
                                    <a-select-option value="shanghai">Zone one</a-select-option>
                                    <a-select-option value="beijing">Zone two</a-select-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                    </template>
                    <a-col :span="6">
                        <a-form-item>
                            <div style="margin-top: 26px;">
                                <a-button type="primary" style="margin-right: 8px;">查询</a-button>
                                <a-button style="margin-right: 8px;">重置</a-button>
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
            <a-table :columns="columns" :data-source="tableData" size="middle" :scroll="{ x: 1300, y: 1000 }">
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
        </a-space>
        <contextHolder />
    </div>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { computed, reactive, ref } from 'vue';
import type { UnwrapRef } from 'vue';
import type { TableColumnsType } from 'ant-design-vue';
import { Modal } from 'ant-design-vue';
import { UpOutlined,DownOutlined } from '@ant-design/icons-vue';
const [modal, contextHolder] = Modal.useModal();

const expand = ref(false)

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

const columns: TableColumnsType = [
    { title: '', dataIndex: 'address', key: '1' },
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

const toDetail = (record) => {
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
  