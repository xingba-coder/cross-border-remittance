<template>
    <commonDetail />
    <div class="footer">
      <a-row>
        <a-col :span="4">
            <a-button @click="goBack">返回</a-button>
        </a-col>
      </a-row>
    </div>
  </template>
  <script setup lang="ts">
  import commonDetail from '@/components/detail.vue'
  import { useRouter } from 'vue-router';
  
  const router = useRouter()
  
  const goBack = () =>{
    router.go(-1)
  }
  
  </script>
  <style lang="less" scoped></style>