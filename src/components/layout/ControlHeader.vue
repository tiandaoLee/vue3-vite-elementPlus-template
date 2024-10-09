<template>
  <div><el-button type="primary" @click="logout">退出登录</el-button></div>
</template>
<script setup>
import { clearRouter } from '@/router.js'
import { useUserStore } from '@/stores/user'
const router = useRouter()
const { setUserInfo } = useUserStore()
const instance = getCurrentInstance()
console.log('🚀 ~ instance:', instance)
const logout = () => {
  clearRouter()
  setUserInfo({})
  ElMessage.success('退出成功')
  router.replace('/login')
}
</script>
