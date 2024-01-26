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
};