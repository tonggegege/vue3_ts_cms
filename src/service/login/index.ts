import type { IAccount } from '@/types'
import hyRequest from '..'

// 登录获取token凭证
export function fetchLoginData(formValue: IAccount) {
  return hyRequest.post({
    url: '/login',
    data: {
      name: formValue.account,
      password: formValue.password
    }
  })
}

// 获取用户是什么角色
export function fetchUserId(id: number) {
  return hyRequest.get({
    url: `/users/${id}`
  })
}

// 根据用户放回的角色获取用户菜单列表
export function fetchUserMenu(id: number) {
  return hyRequest.get({
    url: `/role/${id}/menu`
  })
}
