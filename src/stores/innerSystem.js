import { defineStore } from 'pinia'
export const useInnerSystemStore = defineStore('innerSystem', () => {
  const innerSystem = ref({
    loaded: true,
    pageLoading: true
  })
  const refreshPage = (flag) => {
    innerSystem.value.loaded = flag
  }
  const setPageLoading = (flag) => {
    innerSystem.value.pageLoading = flag
  }

  return { innerSystem, refreshPage, setPageLoading }
})
