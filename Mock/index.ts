import Mock from "mockjs";
import axios from "axios";
import MockAdapter from 'axios-mock-adapter'  // https://www.npmjs.com/package/axios-mock-adapter

// 创建Mock Adapter对象
const mockAxios = new MockAdapter(axios)

// 定义mock数据及其返回结果
mockAxios.onGet(import.meta.env.VITE_BASE_URL + '/getCurrency').reply(() => {
    return [200, { data: 'mocked response' }]
})

// Mock.setup({
//     timeout: "300-400", // 设置相应时间
// });

// Mock.mock(import.meta.env.VITE_BASE_URL + '/getCurrency', 'get', function () {
//     // console.log('1234')  // 这里的console ts校验会报错，需要安装 npm install -g  @types/node
//     return [
//         { label: "美元", value: "USD" },
//         { label: "欧元", value: "EUR" },
//         { label: "日元", value: "JPY" },
//         { label: "英镑", value: "GBP" },
//         { label: "瑞士法郎", value: "CHF" },
//         { label: "加拿大元", value: "CAD" },
//         { label: "澳大利亚元", value: "AUD" },
//         { label: "新西兰元", value: "NZD" },
//         { label: "丹麦克朗", value: "DKK" },
//         { label: "南非兰特", value: "ZAR" },
//         { label: "巴西雷亚尔", value: "BRL" },
//         { label: "俄罗斯卢布", value: "RUB" },
//         { label: "韩国韩元", value: "KRW" },
//     ]
// })