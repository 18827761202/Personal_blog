<script setup>
import axios from "axios";
import { onBeforeMount, reactive, ref } from "vue";
import {
    PhoneFilled,
    User,
    Sugar,
    Male,
    Briefcase,
    Plus,
} from "@element-plus/icons-vue";

const userinfo = reactive({
    data: {}
})
const imageUrl = ref("https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png");
const fileUp = ref();
const ruleFormRef = ref(0);
const rules = reactive({
    nick_name: [
        { required: true, message: '请填写昵称', trigger: 'change' }
    ],
    sex: [
        { required: true, message: '请填写性别', trigger: 'change' }
    ],
    birthday: [
        { required: true, message: '请填写生日', trigger: 'change' }
    ],
    contact_number: [
        { required: true, message: '请填写联系方式', trigger: 'change' }
    ],
    signature: [
        { required: true, message: '请填写个性签名', trigger: 'change' }
    ],
})

onBeforeMount(() => {
    userinfo.data = JSON.parse(sessionStorage.getItem('userinfo'))
    imageUrl.value = userinfo.data.avatar == null ? imageUrl.value : `/api/${userinfo.data.avatar}`;
})

const upUerinfo = (ruleFormRef) => {
    ruleFormRef.validate((valid) => {
        if (valid) {
            ElMessageBox.confirm('确定修改当前个人信息?', 'Warning', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                let form = new FormData();
                form.append('file', fileUp.value)
                form.append('data', JSON.stringify(userinfo.data))
                axios.post("/api/admin/update_userinfo", form).then((res) => {
                    const { data } = res.data
                    sessionStorage.setItem('userinfo', JSON.stringify(data))
                    ElNotification({
                        title: 'Success',
                        message: '修改成功',
                        type: 'success',
                    })
                })
            })
        }
    })
}

const onchange = (file) => {
    fileUp.value = file?.raw
    imageUrl.value = URL.createObjectURL(file?.raw)
}

</script>
<template>
    <div class="card">
        <el-card class="box-card">
            <el-avatar class="el-img" :src="imageUrl" />
            <h1>{{ userinfo.data.user_name }}</h1>
            <p>{{ userinfo.data.signature }}</p>
            <el-divider class="el-divider" />
            <div class="userinfo">
                <span>
                    <el-icon class="el-icon">
                        <User />
                    </el-icon>
                    <i>{{ userinfo.data.nick_name }}</i>
                </span>
                <span>
                    <el-icon class="el-icon">
                        <Sugar />
                    </el-icon>
                    <i>{{ userinfo.data.birthday }}</i>
                </span>
                <span>
                    <el-icon class="el-icon">
                        <Male />
                    </el-icon>
                    <i>{{ userinfo.data.sex }}</i>
                </span>
                <span>
                    <el-icon class="el-icon">
                        <PhoneFilled />
                    </el-icon>
                    <i>{{ userinfo.data.contact_number }}</i>
                </span>
            </div>
        </el-card>
        <el-card class="userinfo-card">
            <el-form :model="userinfo.data" label-width="80px" ref="ruleFormRef" :rules="rules">
                <el-form-item label="头像">
                    <el-upload class="avatar-uploader" :on-change="onchange" :auto-upload="false" :show-file-list="false">
                        <el-avatar class="avatar" v-if="imageUrl" :src="imageUrl" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>
                </el-form-item>
                <el-form-item label="昵称" prop="nick_name">
                    <el-input v-model="userinfo.data.nick_name" />
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-select v-model="userinfo.data.sex">
                        <el-option label="男" value="男" />
                        <el-option label="女" value="女" />
                    </el-select>
                </el-form-item>
                <el-form-item label="生日" prop="birthday">
                    <el-date-picker v-model="userinfo.data.birthday" type="date" format="YYYY/MM/DD"
                        value-format="YYYY-MM-DD" />
                </el-form-item>
                <el-form-item label="联系方式" prop="contact_number">
                    <el-input v-model="userinfo.data.contact_number" />
                </el-form-item>
                <el-form-item label="个性签名" prop="signature">
                    <el-input v-model="userinfo.data.signature" type="textarea" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="upUerinfo(ruleFormRef)">保存</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
<style scoped>
.card {
    display: flex;
    align-items: flex-start;
}

.box-card {
    flex: 1;
    text-align: center;
    margin-right: 30px;
}

.userinfo-card {
    flex: 3;
}

.el-img {
    width: 80px;
    height: 80px;
}

.box-card h1,
.box-card p {
    margin: 10px 0 0 0;
}

.box-card h1 {
    font-size: 20px;
}

.box-card p {
    font-size: 14px;
}

.el-icon {
    vertical-align: middle;
}

.userinfo {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.userinfo i {
    font-style: normal;
    padding-left: 10px;
}

.userinfo span {
    margin: 15px 0 0 0;
}

.el-divider {
    margin: 20px 0 0 0;
}

.userinfo span:first-child {
    margin-top: 20px;
}

.avatar-uploader .avatar {
    width: 100px;
    height: 100px;
    border-radius: 0;
}

.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    text-align: center;
    border: 1px solid #ccc;
}
</style>