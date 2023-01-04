import { ref } from 'vue'
import type UserContent from '@/components/page-content/page-content.vue'

export default function usePageContent() {
  const contentRef = ref<InstanceType<typeof UserContent>>()

  function handleQueryClick(searchForm: any) {
    contentRef.value?.fetchTableData(searchForm)
  }

  function handleResetClick() {
    contentRef.value?.fetchTableData()
  }

  return {
    contentRef,
    handleQueryClick,
    handleResetClick
  }
}
