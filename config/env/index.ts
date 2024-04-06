const envConfig = require(`./${process.env.APP_ENV || process.env.NODE_ENV}`)
const isProduction = process.env.APP_ENV === 'production'

export default {
  baseUrl: 'https://dev',
  baseUrlProxy: '/rest',

  isProduction,

  ...envConfig,
}
