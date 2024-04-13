export default defineNuxtRouteMiddleware((to, from) => {
  console.log('to====',to)
  if (to) {
    // 代客下单等功能会判断参数如果有isAuthorize标识且未登录就跳转登录页
  }
  // if (query.isAuthorize && !store.getters['account/loginStatus']) {
  //   navigateTo(`/login?returnUrl=${route.fullPath}`)
  // }
})
