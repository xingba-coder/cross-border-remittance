import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue' // ts默认不识别 vue 文件，需要在 env.d.ts 中声明
import router from './router'

// mock数据，里面配置了 axios-mock-adapter 可以模拟不同的后台返回的状态（比如 404，延时等等）
// 但无法在浏览器 network 留下记录，所以目前还是采用的启用 express 服务器  ../Mock/server.cjs
// import "../Mock/index"; 

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
