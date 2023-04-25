<script setup>
import { reactive, ref } from 'vue'
const formLabelAlign = reactive({
  name: 'admin',
  region: '123456',
})
</script>

<template>
  <el-row>
    <el-col :span="8">
      <div class="admin_login user">
        <h3 class="admin_title">博客后台管理系统</h3>
        <p class="admin_sign">Sign In</p>
        <el-form :label-position="right" label-width="100px" :model="formLabelAlign" style="max-width: 460px">
          <el-form-item label="User">
            <el-input v-model="formLabelAlign.name" />
          </el-form-item>
          <el-form-item label="password">
            <el-input v-model="formLabelAlign.region" type="password" show-password/>
          </el-form-item>
          <el-button type="primary">Primary</el-button>
        </el-form>
      </div>
    </el-col>
    <el-col :span="16">
      <div class="admin_login">图片</div>
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
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
