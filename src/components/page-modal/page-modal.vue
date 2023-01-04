<script setup lang="ts">
import { ref, reactive } from 'vue'

import useSystemStore from '@/store/main/system'
import useMainStore from '@/store/main/main'

interface Iprops {
  modalConfig: {
    pageName: string
    header: {
      title: string
    }
    formItems: any
  }
  otherInfo?: any
}

const props = defineProps<Iprops>()
const mapModalFromSetup: any = {}
props.modalConfig.formItems.forEach((item: any) => {
  mapModalFromSetup[item.prop] = ''
})

const editFormData = reactive<any>(mapModalFromSetup)
const centerDialogVisible = ref(false)
const isNew = ref(true)
const toModelitemData = ref<any>()

const mainStore = useMainStore()
function isOpenModal(isNewFormContent: boolean, itemData?: any) {
  isNew.value = isNewFormContent
  centerDialogVisible.value = !centerDialogVisible.value

  if (!isNewFormContent && itemData) {
    toModelitemData.value = itemData

    for (const editItem in editFormData) {
      editFormData[editItem] = itemData[editItem]
    }
  } else {
    for (const editItem in editFormData) {
      editFormData[editItem] = ''
    }

    // 重新获取新建时要从服务器获取的数据
    mainStore.fetchEntireDataAction()
  }
}

const systemStore = useSystemStore()

function handleConfirmClick() {
  centerDialogVisible.value = false

  if (!isNew.value) {
    systemStore.patchPageTableDataAction(
      props.modalConfig.pageName,
      toModelitemData.value.id,
      {
        ...editFormData,
        ...props.otherInfo
      }
    )
  } else {
    systemStore.postPageTableDataAction(props.modalConfig.pageName, {
      ...editFormData,
      ...props.otherInfo
    })
  }
}

defineExpose({ isOpenModal })
</script>

<template>
  <div class="modal">
    <el-dialog
      v-model="centerDialogVisible"
      :title="modalConfig.header.title"
      width="30%"
      center
    >
      <div class="form">
        <el-form
          :model="editFormData"
          ref="elFromRef"
          size="large"
          label-width="80"
        >
          <template v-for="item in modalConfig.formItems" :key="item.prop">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'select'">
                <slot
                  :name="item.slotName"
                  v-bind="{ editFormData, item }"
                ></slot>
              </template>
              <template v-else-if="item.type === 'custom'">
                <slot
                  :name="item.slotName"
                  v-bind="{ editFormData, item }"
                ></slot>
              </template>
              <template v-else>
                <el-input
                  v-model="editFormData[item.prop]"
                  :placeholder="item.placeholder"
                ></el-input>
              </template>
            </el-form-item>
          </template>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="less" scoped></style>
