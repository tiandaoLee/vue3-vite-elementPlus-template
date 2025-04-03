<template>
  <div ref="real2">真实页面2</div>
  <div
    ref="el"
    class="flex flex-col gap-2 p-4 w-[300px] h-[300px] m-auto overflow-y-scroll bg-gray-500/5 rounded"
  >
    <div v-for="item in data" :key="item" class="h-15 bg-gray-500/5 rounded p-3">
      {{ item }}
    </div>
  </div>
  <button @click="resetList()">Reset</button>
</template>
<script setup>
import { useInfiniteScroll } from '@vueuse/core'
defineOptions({
  name: 'RealPage2'
})
const elRef = useTemplateRef('el')
const data = ref([])
useInfiniteScroll(
  elRef,
  () => {
    console.log('scroll')
    const lenght = data.value.length + 1
    data.value.push(...Array.from({ length: 5 }, (_, i) => `item ${lenght + i}`))
  },
  {
    distance: 10
  }
)
const resetList = () => {
  data.value = []
}
</script>
