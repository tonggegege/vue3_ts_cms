<script setup lang="ts">
import { computed } from 'vue'

import useLogin from '@/store/login'
import { mapBreadMenu } from '@/utils/map-menu'
import { useRoute } from 'vue-router'

const loginStore = useLogin()

const userMenu = loginStore.userMenu
const route = useRoute()
const breadcrumbArr = computed(() => {
  return mapBreadMenu(route.path, userMenu)
})
</script>

<template>
  <div class="bread">
    <el-breadcrumb separator="-">
      <template v-for="item in breadcrumbArr" :key="item.name">
        <el-breadcrumb-item :to="item.path">{{ item.name }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<style lang="less" scoped></style>
