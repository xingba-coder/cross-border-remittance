import type { Rule } from 'ant-design-vue/es/form';

export const validateAmt = async (_rule: Rule, value: string) => {
    if (value === '') {
        return Promise.reject('请输入大于0且不超过13位整数、两位小数的金额');
    } else {
        if (!/^(0|[1-9]\d{0,12})(\.\d{1,2})?$/.test(value) || /^0(\.0{1,2})?$/.test(value)) {
            return Promise.reject('请输入大于0且不超过13位整数、两位小数的金额');
        }
    }
    return Promise.resolve();
}

export const numToThousands = (num:number|string) =>{
    if(~~num){
        return
    }
    if(typeof num ==='object') {
        return num
    }
    const arr = Number(num).toFixed(2).split('.')
    return Number(arr[0]).toLocaleString() + '.' + (arr[1]?arr[1]:'00')
}

export const thousandsToNum = (thousands:any) =>{
    return Number(thousands.replace(/,/g,''))
}