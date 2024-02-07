const express = require('express');  
const cors = require('cors');
const DATA = require('./constant.cjs')

const app = express();  
app.use(cors()); // 设置跨域

// 设置CORS头信息
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*"); // 允许任何来源的请求
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

function defineResponse(data){
    return {
        code:200,
        data:data,
        message:''
    }
}
  
app.listen(3000, () => {  
    console.log('服务器已启动在3000端口');  
});  
  
app.get('/api/getCurrency', (req, res) => {  
    res.send(defineResponse(DATA['/api/getCurrency']));  
});

app.get('/api/getCustActInfo', (req, res) => {  
    res.send(defineResponse(DATA['/api/getCustActInfo']));  
});

app.get('/api/getCountryList', (req, res) => {  
    res.send(defineResponse(DATA['/api/getCountryList']));  
});

app.get('/api/getTradeCode', (req, res) => {  
    res.send(defineResponse(DATA['/api/getTradeCode']));  
});