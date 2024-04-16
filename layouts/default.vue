<template>
  <div class="common-layout">
    <el-container class="common-layout-container">
      <el-header class="common-layout-header">
        <Header />
      </el-header>
      <el-main>
        <slot></slot>
      </el-main>
      <el-footer class="common-layout-footer">
        <Footer />
      </el-footer>
    </el-container>
  </div>
</template>
<script setup></script>
<style scoped lang="scss">
.common-layout {
  height: 100vh;
  &-container {
    height: 100%;
  }
  &-footer,
  &-header {
    padding: 0;
  }
}
</style>
