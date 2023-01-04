import { defineStore } from 'pinia'
import {
  getEntireRoleData,
  getEntireDepartmentData,
  getEntireMenuData
} from '@/service/main/main'

interface IMainStore {
  entireRole: any[]
  entireDepartment: any[]
  entireMenu: any[]
}

const useMainStore = defineStore('main', {
  state: (): IMainStore => ({
    entireRole: [],
    entireDepartment: [],
    entireMenu: []
  }),
  actions: {
    async fetchEntireDataAction() {
      const entireRoleRes = await getEntireRoleData()
      const entireDepartmentRes = await getEntireDepartmentData()
      const entireMenuRes = await getEntireMenuData()
      this.entireRole = entireRoleRes.data.list
      this.entireDepartment = entireDepartmentRes.data.list
      this.entireMenu = entireMenuRes.data.list
    }
  }
})

export default useMainStore
