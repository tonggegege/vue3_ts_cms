<template>
  <div class="department">
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
    </user-content>
    <user-modal :modal-config="modalConfig" ref="modalRef">
      <template #parentIdSlot="{ editFormData, item }">
        <el-select
          v-model="editFormData.parentId"
          :placeholder="item.placeholder"
          style="width: 100%"
        >
          <template v-for="item in entireDepartment" :key="item.name">
            <el-option :label="item.name" :value="item.id"></el-option>
          </template>
        </el-select> </template
    ></user-modal>
  </div>
</template>

<script setup lang="ts" name="department">
import { storeToRefs } from 'pinia'

import UserSearch from '@/components/page-search/page-search.vue'
import searchConfig from './config/search.config'

import UserContent from '@/components/page-content/page-content.vue'
import contentConfig from './config/content.config'

import UserModal from '@/components/page-modal/page-modal.vue'
import modalConfig from './config/modal.config'

import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'

import useMainStore from '@/store/main/main'

const mainStore = useMainStore()
const { entireDepartment } = storeToRefs(mainStore)

const { contentRef, handleQueryClick, handleResetClick } = usePageContent()
const { modalRef, handleNewPageInfo, handleEditPageInfo } = usePageModal()
</script>

<style scoped></style>
