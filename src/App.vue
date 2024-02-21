<template>
  <a-config-provider :locale="locale === 'en' ? enUS : zhCN">
    <a-layout>
      <a-layout-header :style="{ position: 'fixed', zIndex: 5, width: '100%', paddingInline: '0' }">
        <a-menu mode="horizontal" :items="items" theme="dark" @click="toRouter" />
      </a-layout-header>
      <a-layout-content :style="{ padding: '0 0', marginTop: '64px' }">
        <a-breadcrumb :style="{ margin: '8px 20px' }">
          <a-breadcrumb-item>一级页面</a-breadcrumb-item>
          <a-breadcrumb-item>二级页面</a-breadcrumb-item>
          <a-breadcrumb-item>三级页面</a-breadcrumb-item>
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
        key: 'batchRemit',
        label: '批量汇款',
      },
    ],
  },
  {
    key: 'businessCheck',
    icon: () => h(SettingOutlined),
    label: '业务复核',
    children: [
      {
        key: 'singleCheck',
        label: '单笔复核',
      },
      {
        key: 'batchCheck',
        label: '批量复核',
      },
    ],
  },
  {
    key: 'businessAuth',
    icon: () => h(SettingOutlined),
    label: '业务授权',
    children: [
      {
        key: 'singleAuth',
        label: '单笔授权',
      },
      {
        key: 'batchAuth',
        label: '批量授权',
      },
    ],
  },
  {
    key: 'businessSearch',
    icon: () => h(SettingOutlined),
    label: '综合查询及服务',
    children: [
      {
        key: 'allSearch-index',
        label: '综合查询',
      },
      {
        key: 'downloads',
        label: '下载管理',
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
