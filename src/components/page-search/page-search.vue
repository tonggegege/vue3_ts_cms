<script setup lang="ts">
import { ElForm } from 'element-plus'
import { reactive, ref } from 'vue'
import usePermissions from '@/hooks/usePermission'

interface IProps {
  searchConfig: {
    pageName: string
    labelWidth?: string
    formItems: any
  }
}

const props = defineProps<IProps>()

const isQuery = usePermissions(`${props.searchConfig.pageName}:query`)
const emit = defineEmits(['queryClick', 'resetClick'])

const mapSearchFromSetup: any = {}
props.searchConfig.formItems.forEach((item: any) => {
  mapSearchFromSetup[item.prop] = ''
})
const searchForm = reactive(mapSearchFromSetup)

const elFromRef = ref<InstanceType<typeof ElForm>>()

function handleResetClick() {
  elFromRef.value?.resetFields()

  emit('resetClick')
}

function handleQueryClick() {
  emit('queryClick', searchForm)
}
</script>

<template>
  <div class="search" v-if="isQuery">
    <el-form :model="searchForm" ref="elFromRef" size="large" label-width="80">
      <el-row :gutter="15">
        <template v-for="item in props.searchConfig.formItems" :key="item.prop">
          <el-col :span="8">
            <el-form-item
              :label-width="80"
              :label="item.label"
              :prop="item.prop"
            >
              <template v-if="item.type === 'input'">
                <el-input
                  v-model="searchForm[item.prop]"
                  :placeholder="item.placeholder"
                ></el-input>
              </template>

              <template v-if="item.type === 'select'">
                <el-select
                  v-model="searchForm[item.prop]"
                  placeholder="请输入查询的状态"
                  style="width: 100%"
                >
                  <template v-for="opItem in item.options" :key="opItem.label">
                    <el-option :label="opItem.label" :value="opItem.value" />
                  </template>
                </el-select>
              </template>

              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  v-model="searchForm.createAt"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                />
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>

    <div class="control">
      <el-button icon="Refresh" @click="handleResetClick">重置</el-button>
      <el-button type="primary" icon="Search" @click="handleQueryClick"
        >查询</el-button
      >
    </div>
  </div>
</template>

<style lang="less" scoped>
.search {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;

  .el-form-item {
    padding: 20px 30px;
    margin-bottom: 0;
  }

  .el-button {
    height: 36px;
  }

  .control {
    text-align: right;
    margin-right: 30px;
  }
}
</style>
