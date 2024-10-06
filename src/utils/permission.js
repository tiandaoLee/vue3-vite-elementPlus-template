/*
 * @Descripttion:
 * @Version: 1.0.0
 * @Author: Li Yong
 * @Date: 2022-08-25 17:39:40
 * @LastEditors: chenhongwei chenhw2019@gmail.com
 * @LastEditTime: 2023-05-30 13:58:37
 */
// 遍历后台传来的路由字符串，转换为组件对象
import { ControlLayout } from '@/components/layout'
import Index from '@/views/index/index.vue'
import localRoute from '@/routes/local'

const modulesFiles = import.meta.glob('@/views/**/**.vue')
function filterAsyncRouter(asyncRouterMap, _ = false, type = false, prefPath = '') {
  return asyncRouterMap.filter((route) => {
    // 处理 meta 属性
    route.meta = {
      title: route.name,
      icon: route.icon,
      // noCache: !route.keepAlive,
      showBread: route.showBread,
      useTemplate: route.useTemplate,
      hideMenu: route.hideMenu,
      newFlag: route.newFlag
    }
    // 路由地址转首字母大写驼峰，作为路由名称，适配keepAlive
    // route.name = toCamelCase(route.path, true);
    route.name = route.path
    route.hidden = !route.visible
    route.fullPath = (prefPath ? `${prefPath}/${route.path}` : route.path).replace(/\/+/g, '/')
    // 处理 component 属性
    if (route.children) {
      // 父节点
      route.component = route.parentId !== 0 ? Index : ControlLayout
    } else {
      const componentString = route.component.replace(/^\/+/, ''), // 过滤字符串前面所有 '/' 字符
        componentPath = componentString.replace(/\.\w+$/, '')
      // 根节点
      route.component = modulesFiles[`/src/views/${componentPath}.vue`]
        ? modulesFiles[`/src/views/${componentPath}.vue`]
        : null
    }

    // filterChildren
    if (type && route.children) {
      route.children = filterChildren(route.children)
    }
    if (route.children != null && route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children, route, type, route.path)
    } else {
      delete route['children']
    }
    return true
  })
}

function filterChildren(childrenMap, lastRouter = false) {
  var children = []
  childrenMap.forEach((el) => {
    if (el.children && el.children.length) {
      if (el.component === 'ParentView' && !lastRouter) {
        el.children.forEach((c) => {
          c.path = el.path + '/' + c.path
          if (c.children && c.children.length) {
            children = children.concat(filterChildren(c.children, c))
            return
          }
          children.push(c)
        })
        return
      }
    }
    if (lastRouter) {
      el.path = lastRouter.path + '/' + el.path
    }
    children = children.concat(el)
  })
  return children
}

// 设置路由的重定向地址
const setRedict = (route) => {
  if (route?.children?.length) {
    route.redirect = setRedict(route.children[0])
  }
  return route.fullPath
}
export const generateRoutes = () => {
  return new Promise((resolve) => {
    const route = process.env.NODE_ENV === 'development' ? localRoute : []
    // 向后端请求路由数据
    const rdata = JSON.parse(JSON.stringify(route))
    const rewriteRoutes = filterAsyncRouter([...rdata], false, true)
    // rewriteRoutes.push({ path: '*', redirect: '/404', hidden: true });
    // 重新设置所有路由的重定向地址
    rewriteRoutes.forEach((item) => {
      if (!item.children || !item.children.length) {
        return
      }
      item.redirect = setRedict(item.children[0])
    })
    const [firstRoute] = rewriteRoutes
    rewriteRoutes.push({ path: '/', redirect: firstRoute.redirect, hidden: true })
    resolve(rewriteRoutes)
  })
}
