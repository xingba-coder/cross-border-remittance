import request from "@/utils/request";
import type { AxiosResponse } from 'axios';  

// 声明合并，扩展 AxiosResponse 接口  
interface CustomAxiosResponse<T = any, D = any> extends AxiosResponse<T, D> {  
  code: string | number;  
}  

export function getCurrency():Promise<CustomAxiosResponse>{
    return request({
        url:'/getCurrency',
        method:'get'
    })
}

export function getCustActInfo():Promise<CustomAxiosResponse>{
    return request({
        url:'/getCustActInfo',
        method:'get'
    })
}

export function getCountryList():Promise<CustomAxiosResponse>{
    return request({
        url:'/getCountryList',
        method:'get'
    })
}

export function getTradeCode():Promise<CustomAxiosResponse>{
    return request({
        url:'/getTradeCode',
        method:'get'
    })
}