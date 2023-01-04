import { ref } from 'vue'
import type UserModal from '@/components/page-modal/page-modal.vue'

type EditFnType = (data: any) => void
type newFnType = () => void
export default function usePageContent(
  editCallback?: EditFnType,
  newCallback?: newFnType
) {
  const modalRef = ref<InstanceType<typeof UserModal>>()
  function handleNewPageInfo(isNew: boolean) {
    if (newCallback) newCallback()

    modalRef.value?.isOpenModal(isNew)
  }

  function handleEditPageInfo(isNew: boolean, itemData: any) {
    modalRef.value?.isOpenModal(isNew, itemData)

    if (editCallback) editCallback(itemData)
  }

  return {
    modalRef,
    handleNewPageInfo,
    handleEditPageInfo
  }
}
