import { defineStore } from 'pinia'
export const useInnerSystemStore = defineStore('innerSystem', () => {
  const innerSystem = ref({
    loaded: true
  })
  function refreshPage(flag) {
    innerSystem.value.loaded = flag
  }

  return { innerSystem, refreshPage }
})
