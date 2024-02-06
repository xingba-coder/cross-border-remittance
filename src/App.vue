<template>
  <a-config-provider :locale="locale === 'en' ? enUS : zhCN">
    <a-layout>
      <a-layout-header :style="{ position: 'fixed', zIndex: 5, width: '100%', paddingInline: '20px' }">
        <a-menu mode="horizontal" :items="items" @click="toRouter" />
      </a-layout-header>
      <a-layout-content :style="{ padding: '0 0', marginTop: '64px' }">
        <a-breadcrumb :style="{ margin: '8px 20px' }">
          <a-breadcrumb-item>Home</a-breadcrumb-item>
          <a-breadcrumb-item>List</a-breadcrumb-item>
          <a-breadcrumb-item>App</a-breadcrumb-item>
        </a-breadcrumb>
        <div :style="{}">
          <RouterView />
        </div>
      </a-layout-content>
      <!-- <a-layout-footer :style="{ textAlign: 'center' }">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer> -->
    </a-layout>
  </a-config-provider>
</template>

<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
import { h, ref,onMounted } from 'vue';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons-vue';
import type { MenuProps } from 'ant-design-vue';
import enUS from 'ant-design-vue/es/locale/en_US';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

dayjs.locale('zh'); // 设置antdv日期组件国际化默认为中文

const locale = ref(zhCN.locale); // 设置antdv常用组件国际化默认为中文

const router = useRouter()

const current = ref<string[]>(['']);
const items = ref<MenuProps['items']>([
  {
    key: 'home',
    icon: () => h(AppstoreOutlined),
    label: '首页',
  },
  {
    key: 'remit',
    icon: () => h(SettingOutlined),
    label: '业务委托',
    children: [
      {
        key: 'singleRemit',
        label: '单笔汇款',
        // title: 'singleRemit',
        children: [
          {
            key: 'singleRemit-savedList',
            label: '保存业务处理',
            // title: 'Option 5',
          },
          {
            key: 'singleRemit-launch',
            label: '单笔汇款委托',
            // title: 'Option 6',
          },
          {
            key: 'singleRemit-tobeModified',
            label: '待修改',
          },
          {
            key: 'singleRemit-tobeReviewed',
            label: '待复核/待授权',
          }
        ],
      },
      {
        key: '3',
        label: 'Option 3',
        title: 'Option 3',
      },
    ],
  },
]);
// Binding element 'key' implicitly has an 'any' type
// 函数将对象作为参数，我们解构对象的属性，但不键入对象。这意味着对象属性的类型被隐式设置为任何。
// const toRouter = ({ key }) =>{   
const toRouter = ({ key }: { key: string }) => {
  console.log(key)
  router.push({ name: key })
}

onMounted(() =>{
  // 刷新保存业务处理页面，当前路由信息显示为空？
  const name = router.currentRoute.value.name || 'home'
  console.log(router.currentRoute.value)
  current.value = [name]
})

</script>

<style scoped></style>
