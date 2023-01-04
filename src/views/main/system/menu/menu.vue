<template>
  <div class="menu">
    <user-content
      ref="contentRef"
      :content-config="contentConfig"
      @handle-new-page-info="handleNewPageInfo"
      @handle-edit-page-info="handleEditPageInfo"
    >
    </user-content>
  </div>
</template>

<script setup lang="ts" name="menu">
import UserContent from '@/components/page-content/page-content.vue'
import contentConfig from './config/content.config'

import usePageModal from '@/hooks/usePageModal'
const { handleNewPageInfo, handleEditPageInfo } = usePageModal()
</script>

<style scoped></style>
