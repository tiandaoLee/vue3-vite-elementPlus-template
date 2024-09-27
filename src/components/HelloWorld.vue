<script setup>
import { useSystemLocaleStore } from '@/stores/systemLocale.js'
defineProps({
  msg: {
    type: String,
    required: true
  }
})
const systemLocale = useSystemLocaleStore()
const toggle = () => {
  const locale = systemLocale.localeName
  systemLocale.setLocale(locale === 'zh-cn' ? 'en' : 'zh-cn')
}
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      You’ve successfully created a project with
      <a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>.
      <el-button type="primary" @click="toggle">切换语言</el-button>
    </h3>
    <el-table mb-1 :data="[]" />
    <el-pagination :total="100" />
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
