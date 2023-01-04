import hyRequest from '..'

export function getEntireRoleData() {
  return hyRequest.post({
    url: `/role/list`
  })
}

export function getEntireDepartmentData() {
  return hyRequest.post({
    url: `/department/list`
  })
}

export function getEntireMenuData() {
  return hyRequest.post({
    url: `/menu/list`
  })
}
