import { useLocalePath } from 'nuxt';

export default defineNuxtRouteMiddleware(to => {
  const localePath = useLocalePath()
  const loginRoute = `${localePath('/')}/login`
  const accountRoute = `${localePath('/')}/account`

  const { loginStatus } = useLoginStatus()

  if (to.fullPath === loginRoute && loginStatus.value) {
    return linkTo('/')
  }

  if (to.fullPath.startsWith(accountRoute) && !loginStatus.value) {
    return linkTo('/login')
  }
})
