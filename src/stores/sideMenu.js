import { defineStore } from 'pinia'

export const useSideMenuStore = defineStore('sideMenu', () => {
  const sideMenuInfo = ref({
    show: true
  })
  const showOrHideSideMenu = (flag) => {
    sideMenuInfo.value.show = flag
  }

  return { sideMenuInfo, showOrHideSideMenu }
})
