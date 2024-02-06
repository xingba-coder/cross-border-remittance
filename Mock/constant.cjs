var Mock = require('mockjs')

module.exports = {
  '/api/getCurrency': [
    { label: '美元', value: 'USD' },
    { label: '欧元', value: 'EUR' },
    { label: '日元', value: 'JPY' },
    { label: '英镑', value: 'GBP' },
    { label: '瑞士法郎', value: 'CHF' },
    { label: '加拿大元', value: 'CAD' },
    { label: '澳大利亚元', value: 'AUD' },
    { label: '新西兰元', value: 'NZD' },
    { label: '丹麦克朗', value: 'DKK' },
    { label: '南非兰特', value: 'ZAR' },
    { label: '巴西雷亚尔', value: 'BRL' },
    { label: '俄罗斯卢布', value: 'RUB' },
    { label: '韩国韩元', value: 'KRW' }
  ],
  '/api/getCustActInfo': [
    { actName: '老詹', actNo: '詹姆斯',curCode:'LBJ',orgName:'湖人' },
    { actName: '日天', actNo: '库里',curCode:'SC',orgName:'勇士' },
    { actName: '死神', actNo: '杜兰特',curCode:'KD',orgName:'太阳' },
    { actName: '浓眉', actNo: '戴维斯',curCode:'AD',orgName:'湖人' },
    { actName: '泡椒', actNo: '乔治',curCode:'PG',orgName:'快船' },
    { actName: '大胡子', actNo: '哈登',curCode:'JH',orgName:'快船' },
    { actName: '神龟', actNo: '韦斯特布鲁克',curCode:'WB',orgName:'快船' },
    { actName: '卡哇伊', actNo: '莱昂纳德',curCode:'KL',orgName:'快船' },
    { actName: '佛祖', actNo: '汤普森',curCode:'CT',orgName:'勇士' },
  ]
}
