import { createRouter, createWebHistory } from 'vue-router'
import routes from '@/routes'
import { useUserStore } from '@/stores/user'
import { useInnerSystemStore } from '@/stores/innerSystem'
import { useSystemConfigStore } from '@/stores/systemConfig'
import whiteList from '@/routes/whiteList'
import { generateRoutes } from '@/utils/permission.js'
// 创建路由实例
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // createWebHashHistory URL带#，createWebHistory URL不带#
  strict: true,
  routes: routes,
  scrollBehavior: () => ({ left: 0, top: 0 })
})

router.beforeEach((to, from, next) => {
  console.log('🚀 ~ router.beforeEach ~ to:', to)
  const { userHasLogin } = useUserStore()
  // 非登录态
  if (!userHasLogin) {
    // 非白名单页面都跳转登录页
    if (!whiteList.includes(to.path)) {
      return next('/login')
    }
    return next()
  }
  // 登录状态下访问登录页自动跳转首页
  if (to.path === '/login') {
    return next('/')
  }
  const { innerSystem, setPageLoading } = useInnerSystemStore()
  const { systemMenuList, setSystemConfig } = useSystemConfigStore()
  // 过滤没有权限的菜单或者无需权限的页面
  if (innerSystem.pageLoading || !systemMenuList.length) {
    // 从后端获取路由数据并进行加工
    // 确保字典及权限信息获取到之后再生成路由
    generateRoutes().then(async (accessRoutes) => {
      // 路由为空时清空数据返回登录页
      if (!accessRoutes.length) {
        this.$message.error('暂无权限，请联系管理员或咨询客服处理~')
        // 清空store数据
        if (to.path !== '/login') {
          return next('/login')
        }
      }
      // 根据roles权限生成可访问的路由表
      accessRoutes.forEach((route) => {
        router.addRoute(route) // 动态添加可访问路由表
      })
      setSystemConfig({ menuList: accessRoutes })
      setPageLoading(false)
      // 动态添加可访问路由表
      next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
    })
  } else if (!to.matched.length) {
    // 没有权限的页面直接跳转回工作台页面
    next('/')
  } else {
    next()
  }
})
router.afterEach(() => {
  // 页面渲染完成后执行
})
// 导出路由实例
export const setupRouter = (app) => {
  app.use(router)
}

export const clearRouter = () => {
  const { systemMenuList, setSystemConfig } = useSystemConfigStore()
  // 清空路由
  systemMenuList.forEach((route) => {
    if (route.meta && route.meta.isMenu) {
      console.log('🚀 ~ systemMenuList.forEach ~ route:', route)
      router.removeRoute(route.fullPath)
    }
  })
  // 清空store数据
  setSystemConfig({ menuList: [] })
}
export default router
