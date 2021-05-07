import axios from 'axios'

const request = axios.create({
  timeout: 5000
})


function getBaseUrl (url) {
    if (url.startsWith('/boss')) {
      return 'http://eduboss.lagou.com'
    } else {
      return 'http://edufront.lagou.com'
    }
}


// 创建拦截器
request.interceptors.request.use(function (config) {
  
  // 判断config.url的前缀，来进行请求baseURL的设置
  config.baseURL = getBaseUrl(config.url)

  return config
})

export default request
