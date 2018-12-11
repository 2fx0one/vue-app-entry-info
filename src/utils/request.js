import axios from 'axios'
// import store from '@/store'
// import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  // baseURL: 'http://192.168.200.162:8076/app/moblie',//process.env.baseUrl, // api的base_url
  baseURL: 'http://172.17.29.19:8076/app/mobile',//process.env.baseUrl, // api的base_url
  // baseURL: 'http://tingapi.ting.baidu.com/v1/restserver/',
  withCredentials: true,
  timeout: 5000 // request timeout
})

service.interceptors.response.use((response) => {
  if (response.status === 200) {
    return response.data
  } else {
    return Promise.reject('error')
  }
}, function (error) {
  if (401 === error.response.status) {
    window.location = '/login';
  } else {
    return Promise.reject(error);
  }
});
// axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
//token先注释
// // request interceptor
// service.interceptors.request.use(config => {
//   // Do something before request is sent
//   if (store.getters.token) {
//     config.headers['Accept'] = `application/json`
//     config.headers['Authorization'] = `Bearer ${getToken()}` // 让每个请求携带token-- ['Authorization']为自定义key 请根据实际情况自行修改
//   }
//   return config
// }, error => {
//   // Do something with request error
//   console.log(error) // for debug
//   Promise.reject(error)
// })
//
// // respone interceptor
// service.interceptors.response.use(
//   response => {
//     const res = response.data
//     if (res.code !== 200 && res.code !== undefined) {
//       Message({
//         message: res.msg,
//         type: 'error',
//         duration: 5 * 1000
//       })
//       // 50001:非法的token; 50001:其他客户端登录了;  50001:Token 过期了;
//       if (res.code === 50001) {
//         MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
//           confirmButtonText: '重新登录',
//           cancelButtonText: '取消',
//           type: 'warning'
//         }).then(() => {
//           store.dispatch('FedLogOut').then(() => {
//             location.reload() // 为了重新实例化vue-router对象 避免bug
//           })
//         })
//       }
//       return Promise.reject('error')
//     } else {
//       return response
//     }
//   },
//   /**
//   * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
//   * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
//   */
//   error => {
//     console.log('err' + error)// for debug
//     Message({
//       message: error.message === 'Network Error' ? '网络错误' : error.message,
//       type: 'error',
//       duration: 5 * 1000
//     })
//     return Promise.reject(error)
//   })

export default service
