export default defineNuxtRouteMiddleware((to, from) => {
  const homeRoute = `/`;

  if (to.fullPath === homeRoute) {
    return navigateTo('/home');
  }
});
