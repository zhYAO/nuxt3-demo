export interface fetchOptions {
  method?: string
  headers?: object
  params?: object
  body?: object
  pick?: Array<string>
  onRequest?: Function
  onRequestError?: Function
  onResponse?: Function
  onResponseError?: Function
  _noRetry?: boolean
}
export interface responseResult {
  error: object
  options: {
    headers: object
  }
  request: object
  response: {
    status: number
    _data: {
      systemError: boolean
      status: boolean
      code: number
    }
  }
}

export const useToken = () => {
  const tokenCookie = useCookie('token')
  const token = useState('token', () => tokenCookie.value)
  return {
    token,
    setToken(value: string) {
      token.value = value
      tokenCookie.value = value
    },
  }
}

export const linkTo = (link?: string) => {
  const url = '/' + link
  return navigateTo(url)
}


const onRequest = (result: responseResult) => {
  const { token } = useToken()
  const { options } = result

  if (token.value) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${token.value}`,
    }
  }
}
const onRequestError = (result: responseResult) => {
  console.error(result)
}
const onResponse = (result: responseResult) => {
  const { response } = result
  const { status, _data } = response

  response._data.status = false

  if (status >= 200 && status < 400) {
    response._data.code = Number(_data.code)
    if (_data.code === 1) _data.status = true
  }
}
const onResponseError = (result: responseResult) => {
  const { response } = result
  const { status } = response

  if (status === 401) {
    const { setToken } = useToken()
    setToken('')
    linkTo('/home')
  }

  if (status >= 500) {
    response._data.systemError = true
  }
}

export const useRequest = async (url: string, options?: fetchOptions) => {
  const runtimeConfig = useRuntimeConfig()
  const { baseUrl } = runtimeConfig.public

  const isProduction = process.env.NODE_ENV === 'production'
  const isNeedJoin =
    (process.server || isProduction) && url.startsWith('/') && !url.startsWith('/api')
  const finalUrl = isNeedJoin ? baseUrl + url : url

  if (!options) options = {}
  if (!options.headers) options.headers = {}
  if (!options.onRequest) options.onRequest = onRequest
  if (!options.onRequestError) options.onRequestError = onRequestError
  if (!options.onResponse) options.onResponse = onResponse
  if (!options.onResponseError) options.onResponseError = onResponseError

  const { data } = await useFetch(finalUrl, options as any)
  return data?.value || {}
}
export const useGet = async (url: string, params?: object, options?: fetchOptions) => {
  if (!options) options = {}
  if (params) options.params = params
  options.method = 'GET'

  return await useRequest(url, options)
}
export const usePost = async (url: string, body?: object, options?: fetchOptions) => {
  if (!options) options = {}
  if (body) options.body = body
  options.method = 'POST'

  return await useRequest(url, options)
}
