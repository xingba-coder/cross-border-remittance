<template>
  <a-layout>
    <a-layout-header :style="{ position: 'fixed', zIndex: 5, width: '100%',paddingInline: '20px'  }">
      <a-menu v-model:selectedKeys="current" mode="horizontal" :items="items" @click="toRouter" />
    </a-layout-header>
    <a-layout-content :style="{ padding: '0 20px', marginTop: '64px' }">
      <a-breadcrumb :style="{ margin: '16px 0' }">
        <a-breadcrumb-item>Home</a-breadcrumb-item>
        <a-breadcrumb-item>List</a-breadcrumb-item>
        <a-breadcrumb-item>App</a-breadcrumb-item>
      </a-breadcrumb>
      <div :style="{ background: '#fff', padding: '24px', minHeight: '380px' }">
        <RouterView />
      </div>
    </a-layout-content>
    <!-- <a-layout-footer :style="{ textAlign: 'center' }">
      Ant Design ©2018 Created by Ant UED
    </a-layout-footer> -->
  </a-layout>
</template>

<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
import { h, ref } from 'vue';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons-vue';
import type { MenuProps } from 'ant-design-vue';

const router = useRouter()

const current = ref<string[]>(['home']);
const items = ref<MenuProps['items']>([
  {
    key: 'home',
    icon: () => h(AppstoreOutlined),
    label: 'Navigation Two',
    title: 'Navigation Two',
  },
  {
    key: 'remit',
    icon: () => h(SettingOutlined),
    label: 'Navigation Three - Submenu',
    title: 'Navigation Three - Submenu',
    children: [
      {
        key: 'singleRemit',
        label: 'singleRemit',
        title: 'singleRemit',
        children: [
          {
            key: 'singleRemit-savedList',
            label: 'savedList',
            // title: 'Option 5',
          },
          {
            key: 'singleRemit-launch',
            label: 'launch',
            // title: 'Option 6',
          },
          {
            key:'singleRemit-tobeModified',
            label:'tobeModified',
          },
          {
            key:'singleRemit-tobeReviewed',
            label:'tobeReviewed',
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
  const toRouter = ({key}:{ key:string }) =>{
  console.log(key)
  router.push({name:key})
}

</script>

<style scoped>
</style>
