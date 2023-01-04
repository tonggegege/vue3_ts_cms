import hyRequest from '..'

export function queryPageTableData(systemName: string, queryInfo: any) {
  return hyRequest.post({
    url: `/${systemName}/list`,
    data: queryInfo
  })
}

export function patchPageTableData(
  systemName: string,
  id: number,
  patchInfo: any
) {
  return hyRequest.patch({
    url: `/${systemName}/${id}`,
    data: patchInfo
  })
}

export function postPageTableData(systemName: string, postInfo: any) {
  return hyRequest.post({
    url: `/${systemName}`,
    data: postInfo
  })
}

export function deletePageTableData(systemName: string, id: number) {
  return hyRequest.delete({
    url: `/${systemName}/${id}`
  })
}
