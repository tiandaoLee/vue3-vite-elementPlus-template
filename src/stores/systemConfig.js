import { defineStore } from 'pinia'
export const useSystemConfigStore = defineStore('systemConfig', () => {
  const initSystemConfigData = localStorage.getItem('pinia_system_config')
    ? JSON.parse(localStorage.getItem('pinia_system_config'))
    : {
        menuList: []
      }
  const systemConfig = ref(initSystemConfigData)
  const systemMenuList = computed(() => systemConfig.value.menuList)
  const setSystemConfig = (obj) => {
    systemConfig.value = obj
    localStorage.setItem('pinia_system_config', JSON.stringify(obj))
  }
  return { systemConfig, systemMenuList, setSystemConfig }
})
