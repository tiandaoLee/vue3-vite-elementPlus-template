<template>
  <div>
    <el-menu active-text-color="#ffd04b" background-color="#304156" text-color="#fff" router>
      <template v-for="(item, index) in routers">
        <el-sub-menu :index="item.path" v-if="item.children && item.children.length" :key="index">
          <template #title>{{ item.name }}</template>
          <template v-if="item.children && item.children.length">
            <el-menu-item :index="child.path" v-for="child in item.children" :key="child.path">
              {{ child.name }}
            </el-menu-item>
          </template>
        </el-sub-menu>
        <el-menu-item :index="item.path" v-else :key="index + 1">
          <template #title>{{ item.name }}</template>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script setup>
import { useSystemConfigStore } from '@/stores/systemConfig'
const { systemMenuList } = useSystemConfigStore()
const routers = computed(() => filterRouters(systemMenuList))
const filterRouters = (routes) => {
  // 使用递归方式遍历路由，过滤参数isMenu为false的路由，如果有children，递归调用，添加到children中
  const res = []
  routes.forEach((route) => {
    if (route.meta?.isMenu) {
      const obj = {
        path: route.fullPath || route.path,
        name: route.meta.title || route.name,
        children: []
      }
      if (route.children) {
        obj.children = filterRouters(route.children)
      }
      res.push(obj)
    }
  })
  return res
}
</script>
