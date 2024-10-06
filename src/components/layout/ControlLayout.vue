<!--控制台layout-->
<template>
  <el-container
    class="!min-w-[--page-minWidth] mx-auto my-0 h-screen overflow-hidden bg-[--el-fill-color-dark]"
  >
    <el-header class="w-full border-b border-solid border-[--el-text-color-disabled]">
      <ControlHeader />
    </el-header>
    <el-container class="w-full mx-auto my-0 overflow-hidden">
      <el-aside
        v-if="!$route.meta.hideMenu"
        class="h-[calc(100vh-var(--header-height))]"
        :width="`${menuWidth}px`"
      >
        <SideMenu />
      </el-aside>
      <el-container class="relative">
        <!-- 模版布局自带面包屑，自带边框边距 -->
        <el-main
          class="beautiful-scrollbar relative m-[16px] mb-0 rounded-t-[8px] !flex flex-col"
          v-if="$route.meta.useTemplate"
        >
          <Panel :contentPaddingTop="0" useFlexHeight hasShadow>
            <template #header>
              <BreadCrumb />
            </template>
            <div class="w-full">
              <router-view :key="$route.fullPath" v-if="innerSystem.loaded" />
            </div>
          </Panel>
        </el-main>
        <el-main v-else>
          <router-view :key="$route.fullPath" v-if="innerSystem.loaded" />
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>
<script setup>
import SideMenu from './SideMenu.vue'
import ControlHeader from './ControlHeader.vue'
import BreadCrumb from './BreadCrumb.vue'
import { useSideMenuStore } from '@/stores/sideMenu'
import { useInnerSystemStore } from '@/stores/innerSystem'

const { sideMenuInfo } = useSideMenuStore()
const { innerSystem, refreshPage } = useInnerSystemStore()
const reload = () => {
  refreshPage(false)
  nextTick(() => {
    refreshPage(true)
  })
}
provide('reload', reload)
const menuWidth = computed(() => {
  return sideMenuInfo.show ? 132 : 0
})
</script>
