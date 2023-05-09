import { createRouter, createWebHistory } from 'vue-router'

const Home = () => import('../components/Home/Home.vue')
const House = () => import('../components/Home/House.vue')
const Login = () => import('../components/Login/Login.vue')
const DraftBin = ()=> import('../components/Essay/DraftBin.vue')
const EssayList = ()=> import('../components/Essay/EssayList.vue')
const EssayWrite = ()=> import('../components/Essay/EssayWrite.vue')
const Comments = ()=> import('../components/Comments/Comments.vue')
const Classify = ()=> import('../components/Classify/Classify.vue')
const Userinfo = ()=> import('../components/User/Userinfo.vue')

const routes = [
    {
        // 首页
        path: '/', component: Home, name: 'Home', redirect: '/house',
        children: [
            //首页重定向
            {
                path: 'house',
                component: House,
                name: 'House'
            },
            //草稿箱
            {
                path: 'draftbin',
                component: DraftBin,
                name: 'DraftBin'
            },
            //文章列表
            {
                path: 'essaylist',
                component: EssayList,
                name: 'EssayList'
            },
            //撰写文章
            {
                path: 'essaywrite',
                component: EssayWrite,
                name: 'EssayWrite'
            },
            //我的评论
            {
                path: 'comments',
                component: Comments,
                name: 'Comments'
            },
            //文章分类
            {
                path: 'classify',
                component: Classify,
                name: 'Classify'
            },
            //个人信息
            {
                path: 'userinfo',
                component: Userinfo,
                name: 'Userinfo'
            }
        ]
    },
    // 登录
    { path: '/login', component: Login, name: 'Login' },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;