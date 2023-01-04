<script setup lang="ts">
import { ref, watch } from 'vue'

import paneAccount from './c-cpns/pane-account.vue'
import panePhone from './c-cpns/pane-phone.vue'
import { is_REM_PWD } from '@/global/contants'
import { localCache } from '@/utils/cache'

const tabActive = ref('account')
const remPwd = ref<boolean>(localCache.getCache(is_REM_PWD) ?? false)

const paneAccountRef = ref<InstanceType<typeof paneAccount>>()
function loginbtnClick() {
  if (tabActive.value === 'account') {
    paneAccountRef.value?.fetchAccountData(remPwd.value)
  }
}

watch(remPwd, (newValue) => {
  localCache.removeCache(is_REM_PWD)
  localCache.setCache(is_REM_PWD, newValue)
})
</script>

<template>
  <div class="login">
    <div class="container">
      <h1 class="title">后台管理系统</h1>

      <div class="tabs">
        <el-tabs type="border-card" v-model="tabActive" stretch>
          <el-tab-pane label="User" name="account">
            <template #label>
              <div class="label">
                <el-icon><UserFilled /></el-icon>
                <span class="label-text">账号登录</span>
              </div>
            </template>
            <pane-account ref="paneAccountRef"></pane-account>
          </el-tab-pane>
          <el-tab-pane label="Config" name="phone">
            <template #label>
              <div class="label">
                <el-icon><Iphone /></el-icon>
                <span class="label-text">手机登录</span>
              </div>
            </template>
            <pane-phone></pane-phone>
          </el-tab-pane>
        </el-tabs>
      </div>

      <div class="controls">
        <el-checkbox v-model="remPwd" label="记住密码" size="default" />
        <el-link type="primary">忘记密码</el-link>
      </div>

      <div class="quick-login">
        <el-button
          @click="loginbtnClick"
          class="login-btn"
          type="primary"
          size="large"
        >
          立即登录
        </el-button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.login {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url(@/assets/img/login-bg.svg);

  .container {
    width: 330px;
    margin-bottom: 150px;
    .title {
      text-align: center;
      margin-bottom: 15px;
    }

    .tabs {
      .label {
        display: flex;
        justify-content: center;
        align-items: center;
        .label-text {
          margin-left: 5px;
        }
      }
    }

    .controls {
      margin-top: 12px;
      display: flex;
      justify-content: space-between;
    }

    .login-btn {
      margin-top: 12px;
      width: 100%;
    }
  }
}
</style>
