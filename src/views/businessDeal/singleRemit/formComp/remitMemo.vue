<template>
    <a-form ref="formRef" :model="formState" name="dynamic_rule" layout="vertical">
        <a-row :gutter="24">
            <a-col :span="16">
                <a-form-item label="汇款附言" name="remitMemo">
                    <a-input
                        ref="input"
                        v-model:value="formState.remitMemo"
                        placeholder="请输入" 
                        @focus="focusMemo"
                        @input="inputMemo"
                    />
                </a-form-item>
                <div v-show="showRemitMemo" class="remitMemoBox" v-on-click-outside="onClickOutsideHandler">
                    <ul v-show="memoFilterList.length>0">
                        <li v-for="item in memoFilterList" :key="item" @click="selectItem(item)"><span>{{item}}</span></li>
                    </ul>
                </div>
            </a-col>
            <a-col :span="8">
                <div style="margin-top: 26px;">
                    <a-button type="text">
                        <template #icon>
                            <SaveOutlined />
                        </template>
                        保存为常用附言
                    </a-button>
                    <a-button type="text" @click="openDialog">
                        <template #icon>
                            <SettingOutlined />
                        </template>
                        附言设置
                    </a-button>
                </div>
            </a-col>
        </a-row>
    </a-form>
    <a-modal v-model:open="open" title="常用附言设置" width="80%">
        <VueDraggable v-model="dataSource" target=".ant-table-tbody" :animation="150">
            <a-table :columns="columns" :data-source="dataSource" bordered class="table" :pagination="false">
                <template #bodyCell="{ column, text, record }">
                    <template v-if="column.dataIndex==='drag'">
                        <UnorderedListOutlined style="cursor: pointer;" />
                    </template>
                    <template v-if="column.dataIndex==='remitMemo'">
                        <div>
                            <a-input
                                v-if="editableData[record.key]"
                                v-model:value="editableData[record.key][column.dataIndex]"
                                style="margin: -5px 0"
                            />
                            <template v-else>
                                {{ text }}
                            </template>
                        </div>
                    </template>
                    <template v-else-if="column.dataIndex === 'operation'">
                        <div class="editable-row-operations">
                            <span v-if="editableData[record.key]">
                                <a-typography-link @click="save(record.key)">保存</a-typography-link>
                                <a-popconfirm title="确定取消?" @confirm="cancel(record.key)">
                                <a>取消</a>
                                </a-popconfirm>
                            </span>
                            <span v-else>
                                <a @click="edit(record.key)">编辑</a>
                                <a-popconfirm title="确定删除?" @confirm="cancel(record.seqNo)">
                                    <a>删除</a>
                                </a-popconfirm>
                                <a @click="edit(record.key)">置顶</a>
                            </span>
                        </div>
                    </template>
                </template>
            </a-table>
        </VueDraggable>
      <template #footer>
        <a-button key="back" type="primary">保存</a-button>
        <a-button key="submit">重置</a-button>
      </template>
    </a-modal>
</template>
<script lang="ts" setup>
import { computed, onMounted, reactive, ref } from 'vue';
import type { FormInstance } from 'ant-design-vue';
import { UnorderedListOutlined,SaveOutlined, SettingOutlined} from '@ant-design/icons-vue';
import { vOnClickOutside } from '@vueuse/components'
import { cloneDeep } from 'lodash-es';
import type { UnwrapRef } from 'vue';
import { VueDraggable } from 'vue-draggable-plus'

interface FormState {
    remitMemo: string;
}
const formRef = ref<FormInstance>();
const formState = reactive<FormState>({
    remitMemo: '',
});

const showRemitMemo = ref(false)
const memoList = ['1234','asdf','阿斯蒂芬']
const memoFilterList = ref(['1234','asdf','阿斯蒂芬'])
const focusMemo = () =>{
    showRemitMemo.value = true
}
const inputMemo = () =>{
    memoFilterList.value = memoList.filter((item) =>item.indexOf(formState.remitMemo)>-1)
}
const input = ref()
const onClickOutsideHandler = [
    () => {
        showRemitMemo.value = false
    },
    { ignore: [input] },
]
const selectItem = (item:string) =>{
    formState.remitMemo = item
    showRemitMemo.value = false
}

const open = ref(false)
const openDialog = () =>{
    open.value = true
}

const columns = [
  {
    title: '拖动',
    dataIndex: 'drag',
    width: '8%',
  },
  {
    title: '序号',
    dataIndex: 'seqNo',
    width: '8%',
  },
  {
    title: '附言及用途',
    dataIndex: 'remitMemo',
    width: '66%',
  },
  {
    title: '操作',
    dataIndex: 'operation',
  },
];
interface DataItem {
    key: string;
    seqNo: string;
    drag: string;
  remitMemo: string;
}
const data: DataItem[] = [];
for (let i = 1; i <= 10; i++) {
  data.push({
    key: i.toString(),
    seqNo: i.toString(),
    drag: '#',
    remitMemo: `London Park no. ${i}`,
  });
}

const dataSource = ref(data);
const editableData: UnwrapRef<Record<string, DataItem>> = reactive({});

const edit = (key: string) => {
  editableData[key] = cloneDeep(dataSource.value.filter(item => key === item.key)[0]);
};
const save = (key: string) => {
  Object.assign(dataSource.value.filter(item => key === item.key)[0], editableData[key]);
  delete editableData[key];
};
const cancel = (key: string) => {
  delete editableData[key];
};

onMounted(()=>{
    
})

</script>
<style scoped lang="less">
.remitMemoBox{
    width: 100%;
    box-sizing: border-box;
    margin: 0;
    color: rgba(0, 0, 0, 0.88);
    font-size: 14px;
    line-height: 1.5714285714285714;
    list-style: none;
    font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji';
    position: absolute;
    // top: -9999px;
    z-index: 1050;
    overflow: hidden;
    font-variant: initial;
    background-color: #ffffff;
    border-radius: 8px;
    outline: none;
    box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
    ul{
        padding: 4px;
        padding-left:0;
        display: flex;
        flex-direction: column;
        li{
            position: relative;
            display: block;
            min-height: 32px;
            padding: 5px 12px;
            color: rgba(0, 0, 0, 0.88);
            font-weight: normal;
            font-size: 14px;
            line-height: 1.5714285714285714;
            box-sizing: border-box;
            cursor: pointer;
            transition: background 0.3s ease;
            border-radius: 4px;
            &:hover{
                background-color: rgba(0, 0, 0, 0.04);
            }
            span{
                flex: auto;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
        }
    }
}
</style>