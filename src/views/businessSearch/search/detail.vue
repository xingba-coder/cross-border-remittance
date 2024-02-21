<template>
  <div class="container">
    <a-space class="headerInfo" :size="24">
      <div>初次委托日期<b>2024-02-21</b></div>
      <div>客户申请号<b>--</b></div>
      <div>交易状态<b>--</b></div>
      <div>经办人<b>--</b></div>
    </a-space>
    <a-divider dashed />
    <div class="header">
      <span class="title">汇款信息</span>
    </div>
    <a-form :layout="'vertical'" class="contentRow">
      <a-row :gutter="16">
          <a-col :span="6" v-for="item in firstList" :key="item.label">
            <a-form-item>
              <template #label><div class="label">{{item.label}}</div></template>
              <div class="value">{{item.value}}</div>
            </a-form-item>
          </a-col>
      </a-row>
    </a-form>
    <div class="header">
      <span class="title">收款信息</span>
    </div>
    <a-form :layout="'vertical'" class="contentRow">
      <a-row :gutter="16">
          <a-col :span="6" v-for="item in firstList" :key="item.label">
            <a-form-item>
              <template #label><div class="label">{{item.label}}</div></template>
              <div class="value">{{item.value}}</div>
            </a-form-item>
          </a-col>
      </a-row>
    </a-form>
    <div class="header">
      <span class="title">其他信息</span>
    </div>
    <a-form :layout="'vertical'" class="contentRow">
      <a-row :gutter="16">
          <a-col :span="6" v-for="item in firstList" :key="item.label">
            <a-form-item>
              <template #label><div class="label">{{item.label}}</div></template>
              <div class="value">{{item.value}}</div>
            </a-form-item>
          </a-col>
      </a-row>
    </a-form>
  </div>
  <div class="footer">
    <a-row>
      <a-col :span="4">
          <a-button @click="goBack">返回</a-button>
      </a-col>
    </a-row>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter()

const nameList = [  
  "香克斯", // 四皇之一，路飞的导师  
  "鹰眼米霍克", // 世界第一剑豪  
  "多弗朗明哥", // 前任七武海，天龙人出身  
  "克力架", // 四皇大妈旗下将星之一  
  "卡塔库栗", // 四皇大妈旗下将星之首  
  "白胡子爱德华·纽盖特", // 已故的四皇，路飞的偶像  
  "战国", // 前海军本部元帅  
  "鹤", // 海军本部中将  
  "青雉", // 前海军本部大将  
  "黄猿", // 海军本部大将  
  "藤虎", // 海军本部大将  
  "赤犬", // 海军本部大将，现任元帅  
  "罗", // 超新星之一，路飞的同盟  
  "基德", // 超新星之一  
  "霍金斯", // 超新星之一  
  "德雷克", // 前海军少将，超新星之一，卧底于凯多海贼团  
  "斯摩格", // 海军本部准将  
  "达斯琪", // 海军本部少校  
  "巴索罗缪·大熊", // 前七武海，革命军干部  
  "波雅·汉库克", // 九蛇海贼团船长，女儿岛国王  
]; 

const genRandomStr = (type:string) =>{
  let result = '';
  if(type==='value'){
    let length = Math.floor(Math.random() * 100) + 1; // 生成1到100的随机长度  
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; // 定义可能的字符集  
    for (let i = 0; i < length; i++) {  
        result += characters.charAt(Math.floor(Math.random() * characters.length)); // 从字符集中随机选择一个字符  
    }  
  }else{
    let num = Math.floor(Math.random() * nameList.length)
    result = nameList[num]
  }
  return result; 
}

const firstList: any[] = []
for (let i = 0; i < 17; i++) {
  firstList.push({
    label : genRandomStr('label'),
    value : genRandomStr('value') // 1-100 长度的随机字符串
  })
}

const goBack = () =>{
  router.go(-1)
}

</script>
<style lang="less" scoped>
.headerInfo{
  width: 100%;
  height: 24px;
  line-height: 24px;
  b{
    margin-left:8px;
    font-weight: bold;
  }
}
.contentRow{
  background: #f5f5f5;margin: 0 0 24px;padding: 8px 16px;
  .label{
    color: rgba(0, 0, 0, 0.45);
  }
  .value{
    word-break: break-all;
  }
}
</style>