import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const initUserInfo = localStorage.getItem('pinia_user_info')
    ? JSON.parse(localStorage.getItem('pinia_user_info'))
    : {
        token: ''
      }
  const userInfo = ref(initUserInfo)
  const userHasLogin = computed(() => ![void 0, ''].includes(userInfo.value.token))
  const setUserInfo = (info) => {
    userInfo.value = info
    localStorage.setItem('pinia_user_info', JSON.stringify(info))
  }
  return { userInfo, userHasLogin, setUserInfo }
})
