import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 用于在登录成功后保存用户信息 (初始化是尝试读取本地数据)
    user: JSON.parse(window.localStorage.getItem('user')) || null
  },
  mutations: {
    // 存储用户数据
    setUser (state, payload) {
      // 将payload转成对象后再进行存储
      state.user = JSON.parse(payload)
      // 将payload数据添加到本地存储中
      window.localStorage.setItem('user', payload)
    }
  },
  actions: {
  },
  modules: {
  }
})
