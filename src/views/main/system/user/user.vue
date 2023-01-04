<template>
  <div class="user">
    <user-search
      :search-config="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    ></user-search>
    <user-content
      ref="contentRef"
      :content-config="contentConfig"
      @handle-new-page-info="handleNewPageInfo"
      @handle-edit-page-info="handleEditPageInfo"
    >
      <template #isEnable="{ prop }">
        <el-button
          :type="prop.row.enable == '1' ? 'primary' : 'danger'"
          plain
          size="small"
          >{{ prop.row.enable == '1' ? '启用' : '禁用' }}</el-button
        >
      </template>
    </user-content>
    <user-modal :modal-config="modalConfig" ref="modalRef">
      <template #roleSlot="{ editFormData, item }">
        <el-select
          v-model="editFormData.roleId"
          :placeholder="item.placeholder"
          style="width: 100%"
        >
          <template v-for="item in entireRole" :key="item.name">
            <el-option :label="item.name" :value="item.id"></el-option>
          </template>
        </el-select>
      </template>
      <template #departmentSlot="{ editFormData, item }">
        <el-select
          v-model="editFormData.departmentId"
          :placeholder="item.placeholder"
          style="width: 100%"
        >
          <template v-for="item in entireDepartment" :key="item.name">
            <el-option :label="item.name" :value="item.id"></el-option>
          </template>
        </el-select>
      </template>
    </user-modal>
  </div>
</template>

<script setup lang="ts" name="user">
import { storeToRefs } from 'pinia'

import useMainStore from '@/store/main/main'
import UserSearch from '@/components/page-search/page-search.vue'
import UserContent from '@/components/page-content/page-content.vue'
import UserModal from '@/components/page-modal/page-modal.vue'
import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import modalConfig from './config/modal.config'

import usePageModal from '@/hooks/usePageModal'
import usePageContent from '@/hooks/usePageContent'

const mainStore = useMainStore()
const { entireRole, entireDepartment } = storeToRefs(mainStore)

const { contentRef, handleQueryClick, handleResetClick } = usePageContent()
const { modalRef, handleNewPageInfo, handleEditPageInfo } = usePageModal()
</script>

<style lang="less" scoped></style>
