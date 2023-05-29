import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index.js'
import axios from 'axios'

window.router = router

router.beforeEach(async (to, from) => {
  // router.push({ name: to.name })
  if (
    // 检查用户是否已登录
    sessionStorage.getItem('token') == null &&
    // ❗️ 避免无限重定向
    to.name !== 'Login'
  ) {
    ElNotification({
      title: 'Error',
      message: '您还未登录,请先登录',
      type: 'error',
    })
    // 将用户重定向到登录页面
    return { name: 'Login' }
  }
})

// 将所有的axios请求都带上 请求头
axios.interceptors.request.use(config => {
  if (sessionStorage.getItem('token')) {
    config.headers.Authorization = sessionStorage.getItem('token')
  }
  return config;
}, error => {
  return Promise.reject(error);
})

// 请求拦截，401状态则需要登录
axios.interceptors.response.use(res => {
  return res;
}, err => {
  if (err.response.status == '401') {
    router.push({ path: '/login' });
    ElNotification({
      title: 'Error',
      message: '登录已失效,请重新登录',
      type: 'error',
    })
  }
})


createApp(App)
.use(router)
.mount('#app')