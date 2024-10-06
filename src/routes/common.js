const common = [
  {
    path: '/home',
    name: 'Home',
    meta: { isSinglePage: true },
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/login',
    name: 'Login',
    meta: { isSinglePage: true },
    component: () => import('@/views/login/index.vue')
  }
]
export default common
