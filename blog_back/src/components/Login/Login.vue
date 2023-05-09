<script setup>
import { reactive, ref } from 'vue'
import axios from 'axios'
const formLabelAlign = reactive({
    name: 'admin',
    password: '123456',
})
const ruleFormRef = ref(0);
const rules = reactive({
    name: [
        { required: true, message: '请输入账号', trigger: 'change' }
    ],
    password: [
        { required: true, message: '请输入账号', trigger: 'change' }
    ]
})
const loading = ref(false)
const loadingName = ref("登录")
const login = (ruleFormRef) => {
    ruleFormRef.validate((valid) => {
        if (valid) {
            loading.value = true
            loadingName.value = "登录中,请稍后..."
            axios.post('/api/login', formLabelAlign).then(res => {
                const { success, message, token } = res.data
                sessionStorage.setItem('token', token)
                setTimeout(() => {
                    loading.value = false
                    loadingName.value = "登录"
                    ElNotification({
                        title: success ? 'Success' : 'Error',
                        message,
                        type: success ? 'success' : 'error',
                    })
                    router.push({ name: 'Home', path: '/' })
                }, 500)
            }).catch(err => {
                ElNotification({
                    title: 'Error',
                    message: err,
                    type: 'error',
                })
            })
        }
    })
}


</script>

<template>
    <div id="login_in">
        <div class="admin_app">
            <div class="admin_login images"></div>
            <div class="admin_login user">
                <h3 class="admin_title">博客后台管理系统</h3>
                <el-form :model="formLabelAlign" :rules="rules" ref="ruleFormRef">
                    <el-form-item prop="name">
                        <el-input v-model="formLabelAlign.name" placeholder="User" class="username" />
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input v-model="formLabelAlign.password" type="password" placeholder="Password" show-password
                            class="password" />
                    </el-form-item>

                    <el-button type="primary" class="sign_in" @click="login(ruleFormRef)" :loading=loading>{{ loadingName
                    }}</el-button>
                </el-form>
                <div class="github">
                    <el-alert title="https://github.com/18827761202/Personal_blog" type="success" :closable="false"
                        show-icon />
                    <el-alert title="一个基于Vue+node.js的个人管理系统" type="success" :closable="false" show-icon />
                    <el-alert title="github欢迎大家学习交流" type="success" :closable="false" show-icon />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.admin_app {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 800px;
    border-radius: 2%;
    overflow: hidden;
    box-shadow: 0 0 5px 0;
}

.admin_login {
    float: left;
    width: 400px;
    height: 500px;
}

.images {
    background: url(/public/images/login.jpg) no-repeat 27%;
}

#login_in {
    height: 100vh;
    background: url(/public/images/background.jpg) no-repeat;
    background-size: 100% 100%;
}

.admin_title {
    text-align: center;
    font-size: 26px;
}

.user {
    padding: 20px;
    box-sizing: border-box;
}

.sign_in {
    width: 100%;
    margin-top: 20px;
}

.github {
    margin-top: 50px;
}

.github .el-alert {
    margin: 10px 0;
}
</style>
