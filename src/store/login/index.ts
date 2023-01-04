import { defineStore } from 'pinia'

import type { IAccount } from '@/types'
import { fetchLoginData, fetchUserId, fetchUserMenu } from '@/service/login'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global/contants'
import router from '@/router'
import { mapMenuSetup, mapUserPermission } from '@/utils/map-menu'
import useMainStore from '@/store/main/main'

interface ILogin {
  token: string
  userInfo: any
  userMenu: any
  permisstionList: any
}

const useLogin = defineStore('login', {
  state: (): ILogin => ({
    token: localCache.getCache(LOGIN_TOKEN) ?? '',
    userInfo: {},
    userMenu: [],
    permisstionList: []
  }),
  actions: {
    async fetchLoginDataAction(loginValue: IAccount) {
      const loginRes = await fetchLoginData(loginValue)
      this.token = loginRes.data.token
      localCache.setCache(LOGIN_TOKEN, this.token)

      const id = loginRes.data.id
      const roleRes = await fetchUserId(id)
      this.userInfo = roleRes.data

      const roleId = roleRes.data.role.id
      const userMenu = await fetchUserMenu(roleId)
      this.userMenu = userMenu.data

      // 获取用户是否有权限进行增删改查
      const permisstionList = mapUserPermission(userMenu.data)
      this.permisstionList = permisstionList

      // 数据缓存，方便main页面获取数据
      localCache.setCache('userInfo', roleRes.data)
      localCache.setCache('userMenu', userMenu.data)

      // 获取新建数据时role/department/menu数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()

      const routes = mapMenuSetup(userMenu.data)
      routes.forEach((route) => router.addRoute('main', route))

      router.push('/main')
    },

    // 刷新获取数据
    flushFromMapMenuAction() {
      const token = localCache.getCache(LOGIN_TOKEN)
      const userInfo = localCache.getCache('userInfo')
      const userMenu = localCache.getCache('userMenu')

      if (token && userInfo && userMenu) {
        this.token = token
        this.userInfo = userInfo
        this.userMenu = userMenu

        // 获取用户是否有权限进行增删改查
        const permisstionList = mapUserPermission(this.userMenu)
        this.permisstionList = permisstionList

        const mainStore = useMainStore()
        mainStore.fetchEntireDataAction()

        const routes = mapMenuSetup(this.userMenu)
        routes.forEach((route) => router.addRoute('main', route))
      }
    }
  }
})

export default useLogin
