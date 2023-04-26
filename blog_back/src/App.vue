<script setup>
import { reactive, ref } from 'vue'
const formLabelAlign = reactive({
  name: '',
  region: '',
})
</script>

<template>
  <el-row>
    <el-col :span="8">
      <div class="admin_login user">
        <h3 class="admin_title">博客后台管理系统</h3>
        <p class="admin_sign">Sign In</p>
        <el-form :model="formLabelAlign">
          <el-input v-model="formLabelAlign.name" placeholder="User" class="username"/>
          <el-input v-model="formLabelAlign.region" type="password" placeholder="Password" show-password class="password"/>
          <el-button type="primary">登录</el-button>
        </el-form>
      </div>
    </el-col>
    <el-col :span="16">
      <div class="admin_login"><el-image style="height: calc(100vh - 16px)" src="../public/images/login.jpg" /></div>
    </el-col>
  </el-row>
</template>

<style scoped>
.admin_login {
  height: calc(100vh - 16px);
  box-sizing: border-box;
}

.user {
  background-color: aliceblue;
  padding: 50px 0 0 50px;
}

.admin_title {
  margin: 0;
}

.admin_sign {
  margin-top: 100px;
  font-size: 36px;
  font-weight: bold;
}

.username,.password {
  max-width: 300px;
}
</style>
