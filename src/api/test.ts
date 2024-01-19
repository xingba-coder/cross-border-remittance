import request from "@/utils/request";

export function getCurrency(){
    return request({
        url:'/getCurrency',
        method:'get'
    })
}