<script setup>
import axios from 'axios';
axios.get('/api/admin/home').then(res => {
    console.log(res)
}).catch(err => {
    console.log(err)
})
</script>
<template>
    <h1>你好，app</h1>
</template>
<style scoped></style>