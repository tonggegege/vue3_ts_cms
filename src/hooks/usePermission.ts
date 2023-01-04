import useLogin from '@/store/login'

const loginStore = useLogin()

function usePermissions(permissionId: string) {
  const { permisstionList } = loginStore

  const permisstion = permisstionList.find((item: any) =>
    item.includes(permissionId)
  )

  return !!permisstion
}

export default usePermissions
