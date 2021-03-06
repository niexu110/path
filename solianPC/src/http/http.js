import store from '../vuex/store.js'
import axios from 'axios'
import md5 from 'js-md5'
import qs from 'qs'
axios.interceptors.request.use(config => {
     // loading
     return config
}, error => {
     return Promise.reject(error)
})
axios.interceptors.response.use(response => {
     return response
}, error => {
     return Promise.resolve(error.response)
})

function checkStatus(response) {
     // loading
     // 如果http状态码正常，则直接返回数据
     if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
           return response.data
         
          // 如果不需要除了data之外的数据，可以直接 return response.data
     }
     // 异常状态下，把错误信息返回去
     return {
          status: -404,
          msg: '网络异常,请稍后再试'
     }
}
function checkCode(res) {
     // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
     if (res.status === -404) {
          // console.log(res)
     }
     if (res.data && (!res.data.success)) {
          // console.log(res)
     }
     return res
}

export default {
    
     post(data,urls) {
        
         if (store.state.userInfo != null) {
             data.uid = store.state.userInfo.uid;
             data.drivers = 3;
             data.uidkey = md5(store.state.userInfo.uidkey + store.state.userInfo.uid);
         }
          return axios({
               method: 'post',
               //  http://192.168.1.22:8080/solianjava/
              baseURL:'http://114.215.104.140:8080/solianjava/'+urls,
               data: qs.stringify(data),
               timeout: 10000,
               headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
               }
          }).then(
               response => {
                    return checkStatus(response)
                }
               ).then(
               res => {
                    return checkCode(res)
                }
               )
     },
     get( params,urls) {
          return axios({
               method: 'get',
               baseURL: 'http://192.168.1.22:8080/solianjava/'+urls,
               params, // get 请求时带的参数
          }).then(
               (response) => {
                    return checkStatus(response)
               }
               ).then(
               (res) => {
                    return checkCode(res)
               }
           )
     }
}
