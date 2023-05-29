<script setup>
import axios from 'axios';
import { ref, reactive, onBeforeMount, onMounted, onUnmounted } from 'vue'
import {
    Document,
    Location,
    Setting,
    HomeFilled,
    ChatLineRound, Male
} from '@element-plus/icons-vue'

const nowtime = ref(new Date())

const userinfo = reactive({
    data:{}
})
const imageUrl = ref("https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png");
let times;
// 挂载前
onBeforeMount(() => {
    axios.get('/api/admin/home').then(res => {
        const { message } = res.data
        userinfo.data = message
        sessionStorage.setItem('userinfo',JSON.stringify(userinfo.data))
        imageUrl.value = userinfo.data.avatar == null ? imageUrl.value : `/api/${userinfo.data.avatar}`;
    })
})

// 挂载后
onMounted(() => {
    times = setInterval(() => {
        nowtime.value = new Date()
    }, 1000)
})

// 卸载后
onUnmounted(() => {
    clearInterval(times)
})

</script>
<template>
    <div class="common-layout">
        <el-container>
            <el-header class="el-header">
                <div>
                    <el-avatar class="el-img" :src="imageUrl" />
                </div>
                <div class="userinfo">
                    <p>早上好, {{ userinfo.data.nick_name }} {{ userinfo.data.signature }}</p>
                    <p>现在的时间是 {{ nowtime }}</p>
                </div>
                <div class="Datapresentation">
                    <div>
                        <span>文章发表数</span>
                        <span><el-icon>
                                <Document />
                            </el-icon><i>10</i></span>
                    </div>
                    <div>
                        <span>点赞数</span>
                        <span>10</span>
                    </div>
                    <div>
                        <span>浏览量</span>
                        <span>10</span>
                    </div>
                    <div>
                        <span>访客量</span>
                        <span>10</span>
                    </div>
                </div>
            </el-header>
            <el-container class="el-flex">
                <el-aside class="el-aside">
                    <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo"
                        default-active="2-1" text-color="#fff">
                        <RouterLink to="/" class="router-link">
                            <el-menu-item index="1">
                                <el-icon>
                                    <HomeFilled />
                                </el-icon>
                                <span>首页</span>
                            </el-menu-item>
                        </RouterLink>
                        <el-sub-menu index="2">
                            <template #title>
                                <el-icon>
                                    <location />
                                </el-icon>
                                <span>我的文章</span>
                            </template>
                            <RouterLink to="/essaylist" class="router-link">
                                <el-menu-item index="2-1">
                                    <el-icon>
                                        <Location />
                                    </el-icon>
                                    <span>文章列表</span>
                                </el-menu-item>
                            </RouterLink>
                            <RouterLink to="/essaywrite" class="router-link">
                                <el-menu-item index="2-2">
                                    <el-icon>
                                        <Location />
                                    </el-icon>
                                    <span>撰写文章</span>
                                </el-menu-item>
                            </RouterLink>
                            <RouterLink to="/draftbin" class="router-link">
                                <el-menu-item index="2-3">
                                    <el-icon>
                                        <Location />
                                    </el-icon>
                                    <span>草稿箱</span>
                                </el-menu-item>
                            </RouterLink>
                        </el-sub-menu>
                        <RouterLink to="/comments" class="router-link">
                            <el-menu-item index="3">
                                <el-icon>
                                    <Location />
                                </el-icon>
                                <span>我的评论</span>
                            </el-menu-item>
                        </RouterLink>
                        <RouterLink to="/classify" class="router-link">
                            <el-menu-item index="4">
                                <el-icon>
                                    <Document />
                                </el-icon>
                                <span>文章分类</span>
                            </el-menu-item>
                        </RouterLink>
                        <RouterLink to="/userinfo" class="router-link">
                            <el-menu-item index="5">
                                <el-icon>
                                    <Document />
                                </el-icon>
                                <span>个人信息</span>
                            </el-menu-item>
                        </RouterLink>
                    </el-menu>
                </el-aside>
                <el-main class="el-main">
                    <RouterView></RouterView>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<style scoped>
.el-header {
    display: flex;
    box-shadow: 0 0 5px 0 #000;
    height: auto;
    border-radius: 10px;
    overflow: hidden;
    padding: 20px;
}

.el-header div:first-child {
    height: 80px;
}

.common-layout {
    margin: 10px 20px;
}

.el-aside {
    box-shadow: 0 0 5px 0 #000;
    margin: 20px 20px 0 0;
    border-radius: 10px;
    max-height: calc(100vh - var(--el-header-height));
    width: auto;
    flex: 1;
}

.el-menu {
    border: none;
}

.el-main {
    margin-top: 20px;
    max-height: calc(100vh - var(--el-header-height));
    flex: 4;
    padding: 0 0 0 20px;
}

.el-flex {
    align-items: flex-start;
}

.router-link {
    text-decoration: none;
}

.router-link:active {
    text-decoration: none;
}

.el-img {
    width: 80px;
    height: 80px;
}

.Datapresentation {
    margin-left: auto;
    display: flex;
    align-items: center;
}

.Datapresentation div {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 10px;
}

.Datapresentation div span {
    margin: 10px 0;
}

.Datapresentation div span:last-child {
    height: 20px;
}

.Datapresentation div span i {
    display: inline-block;
    height: 100%;
}

.Datapresentation div span i:first-child {
    vertical-align: middle;
}

.Datapresentation div span i:last-child {
    font-style: normal;
    padding-left: 5px;
}

.userinfo {
    padding-left: 10px;
}

.userinfo p:first-child {
    font-size: 18px;
    font-weight: bold;
    padding-top: 14px;
}

.userinfo p:last-child {
    font-size: 14px;
    padding-top: 10px;
}

.userinfo p {
    margin: 0;
}
</style>