<template>
  <div class="role">
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
    <user-modal
      :modal-config="modalConfig"
      :other-info="otherInfo"
      ref="modalRef"
    >
      <template #menuList>
        <el-tree
          ref="ElTreeRef"
          :data="entireMenu"
          node-key="id"
          :props="{ label: 'name', children: 'children' }"
          show-checkbox
          @check="handleElTreeCheck"
        />
      </template>
    </user-modal>
  </div>
</template>

<script setup lang="ts" name="role">
import { ref, nextTick } from 'vue'
import { storeToRefs } from 'pinia'
import { ElTree } from 'element-plus'

import UserSearch from '@/components/page-search/page-search.vue'
import searchConfig from './config/search.config'

import UserContent from '@/components/page-content/page-content.vue'
import contentConfig from './config/content.config'

import UserModal from '@/components/page-modal/page-modal.vue'
import modalConfig from './config/modal.config'

import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'

import useMainStore from '@/store/main/main'
import { mapTreeMenu } from '@/utils/map-menu'

const mainStore = useMainStore()
const { entireMenu } = storeToRefs(mainStore)

const otherInfo = ref({})
function handleElTreeCheck(data1: any, data2: any) {
  const menuList = [...data2.checkedKeys, ...data2.halfCheckedKeys]
  console.log(menuList)
  otherInfo.value = { menuList }
}

const ElTreeRef = ref<InstanceType<typeof ElTree>>()
function editRoleMenu(itemData: any) {
  nextTick(() => {
    const menuIds = mapTreeMenu(itemData.menuList)
    ElTreeRef.value?.setCheckedKeys(menuIds)
  })
}

function newRoleMenu() {
  nextTick(() => {
    ElTreeRef.value?.setCheckedKeys([])
  })
}

const { contentRef, handleQueryClick, handleResetClick } = usePageContent()
const { modalRef, handleNewPageInfo, handleEditPageInfo } = usePageModal(
  editRoleMenu,
  newRoleMenu
)
</script>

<style scoped></style>
