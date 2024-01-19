import axios from "axios";

const request = axios.create({
    // baseURL:import.meta.env.VITE_BASE_URL,
    baseURL:'http://localhost:3000/api',
    timeout:60000,
})

request.interceptors.response.use((response) =>{
    if(response.status==200){
    }
    return response.data
},(error) =>{
    console.log('axiosError',error)
})

export default request