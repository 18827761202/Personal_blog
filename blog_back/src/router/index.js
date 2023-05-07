import { createRouter, createWebHashHistory } from 'vue-router'

const Home = () => import('../components/Home/Home.vue')
const Login = () => import('../components/Login/Login.vue')

const routes = [
    { path: '/', component: Home, name: 'Home' },
    { path: '/login', component: Login, name: 'Login' },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router;