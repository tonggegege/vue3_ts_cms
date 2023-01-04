<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { FormRules, ElForm } from 'element-plus'
import { ElMessage } from 'element-plus'

import type { IAccount } from '@/types/login'
import useLogin from '@/store/login'
import { localCache } from '@/utils/cache'

const rules = reactive<FormRules>({
  account: [
    { required: true, message: '账号不能为空', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{6,20}$/,
      message: '账户名字要求字母和数字不超过6-20位',
      trigger: 'change'
    }
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{0,6}$/,
      message: '密码要求字母和数字不超过0-6位',
      trigger: 'change'
    }
  ]
})

const form = reactive<IAccount>({
  account: localCache.getCache('name'),
  password: localCache.getCache('password')
})
const loginStore = useLogin()
const formRef = ref<InstanceType<typeof ElForm>>()
// 发送请求
function fetchAccountData(isRemPwd: boolean) {
  formRef.value?.validate((isLogin) => {
    if (isLogin === true) {
      const account = form.account
      const password = form.password
      loginStore.fetchLoginDataAction({ account, password }).then(() => {
        if (isRemPwd === true) {
          localCache.setCache('name', account)
          localCache.setCache('password', password)
        } else {
          localCache.removeCache('name')
          localCache.removeCache('password')
        }
      })
    } else {
      ElMessage.error('您输入的账号或者密码有误')
    }
  })
}

defineExpose({ fetchAccountData })
</script>

<template>
  <div class="pane-account">
    <el-form
      :model="form"
      label-width="60px"
      :rules="rules"
      status-icon
      size="large"
      ref="formRef"
    >
      <el-form-item label="账号" prop="account">
        <el-input class="input-style" v-model="form.account" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input class="input-style" v-model="form.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
.pane-account {
  color: red;
}
</style>
