<script setup>
import axios from 'axios';
import { reactive } from 'vue';
import {
    PhoneFilled,
    User,
    Sugar,
    Male,
    Briefcase
} from '@element-plus/icons-vue'
const userinfo = reactive({
    data: {}
})
axios.get('/api/admin/home').then(res => {
    const { message } = res.data
    console.log(message[0])
    userinfo.data = message[0]
})
console.log(userinfo.data)
</script>
<template>
    <el-card class="box-card">
        <el-avatar class="el-img" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
        <h1>{{ userinfo.data.user_name }}</h1>
        <p>{{ userinfo.data.signature }}</p>
        <el-divider />
        <div class="userinfo">
            <span>
                <el-icon><User /></el-icon>
                <i>{{ userinfo.data.nick_name }}</i>
            </span>
            <span>
                <el-icon><Sugar /></el-icon>
                <i>2001/04/30</i>
            </span>
            <span>
                <el-icon><Male /></el-icon>
                <i>男</i>
            </span>
            <span>
                <el-icon><PhoneFilled /></el-icon>
                <i>{{ userinfo.data.contact_number }}</i>
            </span>
            <span>
                <el-icon><Briefcase /></el-icon>
                <i>JavaScript css3</i>
            </span>
            
        </div>

    </el-card>
</template>
<style scoped>
.box-card {
    width: 400px;
}
.el-img {
    width: 80px;
    height: 80px;
}
.userinfo {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 0 auto;
    width: 50%;
}
.userinfo i {
    font-style: normal;
}
</style>