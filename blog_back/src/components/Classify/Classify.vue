<script setup>
import axios from 'axios';
import { onBeforeMount, reactive } from 'vue';
const tableData = reactive([])

onBeforeMount(()=>{
    axios.get("/api/admin/get_category_list").then((res)=>{
        const {data} = res.data
        tableData.push(...data)
    })
})

</script>
<template>
    <el-card class="box-card">
        <div>
            <el-button type="success">创建</el-button>
            <el-button type="warning">修改</el-button>
            <el-button type="danger">删除</el-button>
        </div>
        <el-table :data="tableData" max-height="calc(100vh - 268px)" style="width: 100%">
            <el-table-column type="selection" width="55" />
            <el-table-column prop="name" label="文章分类" width="180" />
            <el-table-column prop="name" label="所属文章数" width="180" />
            <el-table-column prop="create_time" label="创建时间" width="180" />
            <el-table-column prop="update_time" label="更新时间" />
        </el-table>
    </el-card>
</template>
<style scoped>
.box-card {
    margin-right: 30px;
}
</style>