<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { LOGIN_TOKEN } from '@/global/contants'
import { localCache } from '@/utils/cache'
import Bread from './c-cpns/bread.vue'

const isFold = ref(false)

const emit = defineEmits(['foldChange'])

function showMenuClick() {
  isFold.value = !isFold.value

  emit('foldChange', isFold.value)
}

const router = useRouter()
function closeCmsClick() {
  localCache.removeCache(LOGIN_TOKEN)

  router.push('/login')
}
</script>

<template>
  <div class="main-header">
    <div class="menu-icon" @click="showMenuClick">
      <el-icon size="28">
        <component :is="isFold ? 'expand' : 'fold'"></component>
      </el-icon>
    </div>
    <div class="content">
      <div class="breadcrumb"><Bread /></div>
      <div class="header-info">
        <div class="option">
          <span class="item">
            <el-icon size="20"><Message /></el-icon>
          </span>
          <span class="item">
            <el-icon size="20"><ChatDotRound /></el-icon>
            <span class="dot"></span>
          </span>
          <span class="item">
            <el-icon size="20"><Search /></el-icon>
          </span>
        </div>

        <div class="setting">
          <el-dropdown :hide-on-click="false">
            <span class="userInfo">
              <el-avatar
                :size="30"
                src="https://upload.jianshu.io/users/upload_avatars/1102036/c3628b478f06.jpeg"
              />

              <span class="name">codertg</span>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="closeCmsClick">
                  <el-icon><CircleClose /></el-icon>
                  退出系统
                </el-dropdown-item>
                <el-dropdown-item divided>
                  <el-icon><InfoFilled /></el-icon>
                  个人信息
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-icon><Unlock /></el-icon>
                  修改密码
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.main-header {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-info {
  display: flex;
  align-items: center;
}

.content {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 18px;

  .option {
    display: flex;
    margin-right: 20px;

    .item {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 35px;
      cursor: pointer;

      &:hover {
        background: #f2f2f2;
      }
    }

    .dot {
      position: absolute;
      top: 3px;
      right: 3px;
      z-index: 10;
      width: 6px;
      height: 6px;
      background: red;
      border-radius: 100%;
    }
  }

  .setting {
    .userInfo {
      display: flex;
      align-items: center;
      cursor: pointer;

      .name {
        margin-left: 5px;
      }
    }

    :global(.el-dropdown-menu__item) {
      line-height: 36px !important;
      padding: 6px 22px;
    }
  }
}
</style>
