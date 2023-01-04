<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'

import { formatUTC } from '@/utils/format'
import useSystemStore from '@/store/main/system'
import usePermissions from '@/hooks/usePermission'

interface Iprops {
  contentConfig: {
    pageName: string
    header: {
      title: string
      btnTitle: string
    }
    tableItems: any
  }
}

const props = defineProps<Iprops>()

const isQuery = usePermissions(`${props.contentConfig.pageName}:query`)
const isCreate = usePermissions(`${props.contentConfig.pageName}:create`)
const isUpdate = usePermissions(`${props.contentConfig.pageName}:update`)
const isDelete = usePermissions(`${props.contentConfig.pageName}:delete`)

const currentPage = ref(1)
const pageSize = ref(10)
const emit = defineEmits(['handleNewPageInfo', 'handleEditPageInfo'])

const systemStore = useSystemStore()

// 监听store中action发生的变化，使得页面页数编辑/添加/删除时发生变化
systemStore.$onAction(({ name, after }) => {
  after(() => {
    if (
      name === 'postPageTableDataAction' ||
      name === 'deletePageTableDataAction' ||
      name === 'patchPageTableDataAction'
    ) {
      currentPage.value = 1
    }
  })
})
const { pageList, pageTotalCount } = storeToRefs(systemStore)
fetchTableData()

function fetchTableData(searchInfo?: any) {
  if (!isQuery) {
    return
  }
  let size = pageSize.value
  let offset = (currentPage.value - 1) * size

  const pageInfo = { offset, size }
  const queryInfo = { ...pageInfo, ...searchInfo }
  systemStore.queryPageTableDataAction(props.contentConfig.pageName, queryInfo)
}
function handleSizeChange() {
  fetchTableData()
}
function handleCurrentChange() {
  fetchTableData()
}

function handleNewPageInfoClick() {
  emit('handleNewPageInfo', true)
}

function handleEditPageInfoClick(itemData: any) {
  emit('handleEditPageInfo', false, itemData)
}

function handleDelPageInfoClick(id: number) {
  systemStore.deletePageTableDataAction(props.contentConfig.pageName, id)
}

defineExpose({ fetchTableData })
</script>

<template>
  <div class="content">
    <div class="header">
      <h3 class="title">{{ props.contentConfig.header.title }}</h3>
      <el-button
        v-if="isCreate"
        type="primary"
        @click="handleNewPageInfoClick"
        >{{ props.contentConfig.header.btnTitle }}</el-button
      >
    </div>
    <div class="table">
      <el-table
        :data="pageList"
        border
        style="width: 100%"
        row-key="id"
        :tree-props="{ children: 'children' }"
      >
        <template v-for="item in contentConfig.tableItems" :key="item.label">
          <template v-if="item.type === 'costom'">
            <el-table-column
              align="center"
              label="状态"
              prop="enable"
              width="100"
            >
              <template #default="prop">
                <slot :name="item.slotName" v-bind="{ prop }"> </slot>
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'timer'">
            <el-table-column align="center" v-bind="item">
              <template #default="prop">
                {{ formatUTC(prop.row.createAt) }}
              </template>
            </el-table-column>
          </template>

          <template v-else-if="item.type === 'handler'">
            <el-table-column align="center" v-bind="item">
              <template #default="prop">
                <el-button
                  type="primary"
                  plain
                  size="small"
                  @click="handleEditPageInfoClick(prop.row)"
                  v-if="isUpdate"
                  >编辑</el-button
                >
                <el-button
                  type="danger"
                  plain
                  size="small"
                  @click="handleDelPageInfoClick(prop.row.id)"
                  v-if="isDelete"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </template>
          <template v-else>
            <el-table-column align="center" v-bind="item"></el-table-column>
          </template>
        </template>
      </el-table>
    </div>

    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<style lang="less" scoped>
.content {
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 10px;

    .title {
      font-size: 22px;
      margin: 0;
    }
  }

  .pagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }
}
</style>
