<template>
  <el-menu
    :default-active="activeIndex"
    class="common-header"
    mode="horizontal"
    :ellipsis="false"
    @select="handleSelect"
  >
    <img
      class="common-header-logo"
      src=""
      alt="LOGO"
    />
    <div class="flex-grow" />
    <el-menu-item
      v-for="item in menuList"
      :key="item.index"
      :index="item.index"
    >{{ item.title }}</el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const menuList = [
  {
    index: '/product-list',
    title: 'Menu-plp'
  },
  {
    index: '/cart',
    title: 'Menu-cart'
  },
  {
    index: '/mine',
    title: 'Menu-mine'
  }
]
const activeIndex = ref('')

const handleSelect = (key: string, keyPath: string[]) => {
  navigateTo(key)
}

</script>

<style scoped lang="scss">
.common-header {
  align-items: center;
  &-logo {
    width: 120px;
    height: 32px;
    background: rgba(0, 0, 0, 0.1);
  }
  .flex-grow {
    flex-grow: 1;
  }
}
</style>
