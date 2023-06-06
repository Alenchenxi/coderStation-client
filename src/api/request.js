import axios from 'axios'

const request = axios.create({
    timeout: 5000
})

// 请求拦截
request.interceptors.request.use(res => {
    // 有token就将token带过去
    if (localStorage.getItem('userToken')) {
        res.headers['Authorization'] = 'Bearer ' + localStorage.getItem('userToken')
    }
    return res
})

// 响应拦截
request.interceptors.response.use(response => {
    return response.data
})

export default request