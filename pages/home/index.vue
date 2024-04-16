<template>
  <div class="block text-center">home</div>
</template>

<script setup>
// 以编程和响应式的方式管理头部标签
useHead({
  title: 'nuxt3',
  meta: [
    { name: 'description', content: 'nuxt3网站。' },
    { name: 'keywords', content: '网上购物,网上商城,家电,手机,电脑,服装,居家,母婴,美妆,个护,食品' },
  ],
});

// 站点的SEO
useSeoMeta({
  title: '我的nuxt3网站',
  // 搜索关键词
  keywords: '网上购物,网上商城,家电,手机,电脑,服装,居家,母婴,美妆,个护,食品',
  // 搜索时，展示的网站介绍
  description:
    '专业的综合网上购物商城，为您提供正品低价的购物选择、优质便捷的服务体验。商品来自全球数十万品牌商家，囊括家电、手机、电脑、服装、居家、母婴、美妆、个护、食品、生鲜等丰富品类，满足各种购物需求。',
});
</script>

<style scoped lang="scss"></style>
