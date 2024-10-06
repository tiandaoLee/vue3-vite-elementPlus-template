<template>
  <div>这是登录页</div>
  <el-button type="primary" @click="handleLogin">登录</el-button>
</template>
<script setup>
import { useUserStore } from '@/stores/user.js'
defineOptions({
  name: 'LoginPage'
})
const router = useRouter()
const handleLogin = () => {
  const { setUserInfo } = useUserStore()
  setUserInfo({ token: '123' })
  router.push('/real')
  console.log('登录成功')
}
</script>
