import axios from "axios"
import nprogress from "nprogress"
import "nprogress/nprogress.css"
const service = axios.create({
    baseURL: "/api",
    timeout: 5000,
})
//请求拦截器
service.interceptors.request.use((config) => {
    nprogress.start()
    return config

})
//相应拦截器
service.interceptors.response.use((response) => {
    nprogress.done()
    const { message, data, ok } = response.data
    if (ok) {
        return data
    } else {
        return Promise.reject(new Error(message))
    }

}, (error) => {
    return Promise.reject(error)
})
export default service
