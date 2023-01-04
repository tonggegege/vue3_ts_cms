import HYRequest from './request'
import { localCache } from '@/utils/cache'
import { BASE_URL, TIME_OUT } from './config'
import { LOGIN_TOKEN } from '@/global/contants'

const hyRequest = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestSuccessFn(config) {
      const token = localCache.getCache(LOGIN_TOKEN)

      // 类型缩小
      if (config.headers && token) {
        config.headers.Authorization = 'Bearer ' + token
      }

      return config
    }
  }
})

export default hyRequest
