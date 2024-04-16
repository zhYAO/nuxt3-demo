export default defineNuxtRouteMiddleware((to) => {
  const initRoute = `/`;
  console.log('to', to);
  if (to.fullPath === initRoute) {
    return navigateTo('/home');
  }
});
