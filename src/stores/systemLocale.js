import { defineStore } from 'pinia'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'

export const useSystemLocaleStore = defineStore('systemLocale', () => {
  const localeMap = new Map([
    ['en', en],
    ['zh-cn', zhCn]
  ])
  const localeName = ref('en')
  const locale = computed(() => localeMap.get(localeName.value))
  function setLocale(value) {
    localeName.value = value
  }

  return { localeName, locale, setLocale }
})
