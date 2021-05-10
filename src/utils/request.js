import axios from 'axios'
// 引入vuex的数据
import store from '@/store'

const request = axios.create({
//   timeout: 5000
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
  // 判断 config.url 的前缀，来进行请求baseURL的设置
  config.baseURL = getBaseUrl(config.url)

  // 统一设置 token 信息
  const { user } = store.state
  if (user && user.access_token) {
    config.headers.Authorization = user.access_token
  }

  return config
})

export default request
