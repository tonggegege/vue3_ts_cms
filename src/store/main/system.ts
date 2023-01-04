import { defineStore } from 'pinia'

import {
  queryPageTableData,
  postPageTableData,
  patchPageTableData,
  deletePageTableData
} from '@/service/main/system'

const useSystemStore = defineStore('system', {
  state: () => ({
    pageList: [],
    pageTotalCount: 0
  }),
  actions: {
    async queryPageTableDataAction(systemName: string, queryInfo: any) {
      const pageTableRes = await queryPageTableData(systemName, queryInfo)
      this.pageList = pageTableRes.data.list
      this.pageTotalCount = pageTableRes.data.totalCount
    },

    async patchPageTableDataAction(
      systemName: string,
      id: number,
      patchInfo: any
    ) {
      await patchPageTableData(systemName, id, patchInfo)

      this.queryPageTableDataAction(systemName, { offset: 0, size: 10 })
    },

    async postPageTableDataAction(systemName: string, postInfo: any) {
      await postPageTableData(systemName, postInfo)

      this.queryPageTableDataAction(systemName, { offset: 0, size: 10 })
    },

    async deletePageTableDataAction(systemName: string, id: number) {
      await deletePageTableData(systemName, id)

      this.queryPageTableDataAction(systemName, { offset: 0, size: 10 })
    }
  }
})

export default useSystemStore
