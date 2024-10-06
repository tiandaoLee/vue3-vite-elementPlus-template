<template>
  <div
    class="relative w-full bg-[--el-color-white] rounded-[8px] box-border]"
    :class="{ 'shadow-[0_0_10px_0_rgba(0,0,0,0.02)]': hasShadow }"
    ref="panel"
    :style="{ minHeight: contentHeight }"
  >
    <div class="py-[12px] px-[24px]" v-if="$slots['header']">
      <slot name="header"></slot>
    </div>
    <div
      class="px-[24px]"
      :style="{ paddingTop: `${contentPaddingTop}px`, paddingBottom: `${contentPaddingBottom}px` }"
    >
      <slot></slot>
    </div>
  </div>
</template>
<script setup>
defineOptions({
  name: 'Panel'
})
const props = defineProps({
  contentPaddingTop: {
    type: [Number, String],
    default: 24
  },
  contentPaddingBottom: {
    type: Number,
    default: 24
  },
  hasShadow: {
    type: Boolean,
    default: false
  },
  // 是否使用弹性高度，例如panel需要占据整屏高度的剩余高度
  useFlexHeight: {
    type: Boolean,
    default: false
  },
  // panel顶部的距离，useFlexHeight为true时生效，用于计算精准的剩余高度，默认除去两个panel的间隔16px
  topInstance: {
    type: [Number, String],
    default: 16
  }
})
const contentHeight = ref('auto')
const observer = ref(null)
const panel = ref()
onMounted(() => {
  if (props.useFlexHeight) {
    calcContentHeight()
  }
})
onBeforeUnmount(() => {
  if (observer.value) {
    observer.value.disconnect()
    observer.value = null
  }
})
const calcContentHeight = () => {
  contentHeight.value = `calc(100vh - ${panel.value.getBoundingClientRect().top}px)`
  const config = { attributes: true, childList: false, subtree: false }
  const callback = () => {
    let getBoundingClientRect = panel.value.getBoundingClientRect()
    contentHeight.value = `calc(100vh - ${getBoundingClientRect.top}px)`
  }
  observer.value = new MutationObserver(callback)
  observer.value.observe(panel.value, config)
}
</script>
