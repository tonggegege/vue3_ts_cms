<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import useLogin from '@/store/login'
import { mapflushMenu } from '@/utils/map-menu'

defineProps({
  isFold: {
    type: Boolean,
    default: () => false
  }
})
const loginStore = useLogin()
const userMenu = loginStore.userMenu

const router = useRouter()
// 点击页面路由跳转
function handleRouteShowClick(path: string) {
  router.push(path)
}

const route = useRoute()
// 刷新进来的路由保持不变，以及初始进来的页面
const defaultActive = computed(() => {
  return mapflushMenu(route.path, userMenu) + ''
})
</script>

<template>
  <div class="main-menu">
    <div class="logo">
      <img class="logo-image" src="@/assets/img/logo.svg" />
      <h2 class="title">后台管理系统</h2>
    </div>
    <!-- el-sub-menu el el-menu-item-group-->
    <el-menu
      :default-active="defaultActive"
      text-color="#b7bdc3"
      active-text-color="#fff"
      background-color="#001529"
      :collapse="isFold"
    >
      <template v-for="item in userMenu" :key="item.id">
        <el-sub-menu :index="item.id + ''">
          <template #title>
            <el-icon>
              <component :is="item.icon?.split('-icon-')[1]" />
            </el-icon>
            <span>{{ item.name }}</span>
          </template>

          <template v-for="subItem in item.children" :key="subItem.id">
            <el-menu-item
              :index="subItem.id + ''"
              @click="handleRouteShowClick(subItem.url)"
            >
              {{ subItem.name }}
            </el-menu-item>
          </template>
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>

<style lang="less" scoped>
.main-menu {
  height: 100%;
  background-color: #001529;
}
.logo {
  display: flex;
  height: 28px;
  padding: 12px 10px 8px 10px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;

  .logo-image {
    height: 100%;
    margin: 0 10px;
  }

  .title {
    font-size: 16px;
    font-weight: 700;
    color: white;
    white-space: nowrap;
  }
}

.el-menu {
  border-right: none;
  user-select: none;
}

.el-sub-menu {
  .el-menu-item {
    padding-left: 50px !important;
    background-color: #0c2135;
  }

  .el-menu-item:hover {
    color: #fff !important;
  }

  .el-menu-item.is-active {
    background-color: #0a60bd !important;
  }
}
</style>
