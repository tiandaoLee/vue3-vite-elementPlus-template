const common = [
  {
    path: '/login',
    name: 'Login',
    meta: { isSinglePage: true },
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/404',
    name: 'NotFound',
    meta: { isSinglePage: true },
    component: () => import('@/views/NotFoundView.vue')
  }
]
export default common
