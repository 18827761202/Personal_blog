<script setup>
import { reactive, ref } from 'vue'
const formLabelAlign = reactive({
  name: 'admin',
  region: '123456',
})
</script>

<template>
  <div id="login_in">
    <div class="admin_app">
      <div class="admin_login images"></div>
      <div class="admin_login user">
        <h3 class="admin_title">博客后台管理系统</h3>
        <el-form :model="formLabelAlign">
          <el-input v-model="formLabelAlign.name" placeholder="User" class="username" />
          <el-input v-model="formLabelAlign.region" type="password" placeholder="Password" show-password
            class="password" />
          <el-button type="primary" class="sign_in">登录</el-button>
        </el-form>
        <div class="github">
          <el-alert title="https://github.com/18827761202/Personal_blog" type="success" :closable="false" show-icon/>
          <el-alert title="一个基于Vue+node.js的个人管理系统" type="success" :closable="false" show-icon/>
          <el-alert title="github欢迎大家学习交流" type="success" :closable="false" show-icon/>
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
  background: url(../public/images/login.jpg) no-repeat 27%;
}

#login_in {
  height: 100vh;
  background: url(../public/images/background.jpg) no-repeat;
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

.username,
.password {
  padding: 10px 0;
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
