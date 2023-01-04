import type { RouteRecordRaw } from 'vue-router'

// 获取全部总路由
function loadLocalRoutes() {
  const localRoutes: RouteRecordRaw[] = []

  // 遍历获取router中的路由数据对象
  const files: Record<string, any> = import.meta.glob(
    '../router/main/**/*.ts',
    {
      eager: true
    }
  )

  for (const key in files) {
    const module = files[key]
    localRoutes.push(module.default)
  }

  return localRoutes
}

// （记录）默认第一个菜单
export let fristMenu: any = null
export function mapMenuSetup(userMenu: any) {
  const localRoutes = loadLocalRoutes()

  const routes: RouteRecordRaw[] = []
  for (const menu of userMenu) {
    for (const submenu of menu.children) {
      const route = localRoutes.find((item) => item.path === submenu.url)

      if (route) {
        // 添加路由到用户路由的上级路由（只需添加一次）
        // 为什么可以添加（第一次进来routes没有path：menu.url路径）
        if (!routes.find((item) => item.path === menu.url)) {
          routes.push({ path: menu.url, redirect: route.path })
        }

        routes.push(route)
      }

      if (!fristMenu && route) {
        fristMenu = route
      }
    }
  }

  return routes
}

export function mapflushMenu(path: string, userMenu: any) {
  let id: number = 0

  for (const menu of userMenu) {
    for (const submenu of menu.children) {
      if (path === submenu.url) {
        id = submenu.id
      }
    }
  }

  return id
}

export function mapBreadMenu(path: string, userMenu: any) {
  const breadcrumbArr: any[] = []

  for (const menu of userMenu) {
    for (const submenu of menu.children) {
      if (path === submenu.url) {
        breadcrumbArr.push({ name: menu.name, path: menu.url })

        breadcrumbArr.push({ name: submenu.name, path: submenu.url })
      }
    }
  }

  return breadcrumbArr
}

// 映射菜单用于el-tree展示
export function mapTreeMenu(allMenu: any) {
  const ids: any[] = []

  function getTreeMenu(menu: any[]) {
    for (const item of menu) {
      if (item.children) {
        getTreeMenu(item.children)
      } else {
        ids.push(item.id)
      }
    }
  }

  getTreeMenu(allMenu)

  return ids
}

// 映射用户权限
export function mapUserPermission(userMenu: any) {
  const permissionList: string[] = []

  function getPermissionList(menuList: any) {
    for (const item of menuList) {
      if (item.type === 3) {
        permissionList.push(item.permission)
      } else {
        getPermissionList(item.children ?? [])
      }
    }
  }

  getPermissionList(userMenu)

  return permissionList
}
