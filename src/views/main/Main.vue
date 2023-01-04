<script setup lang="ts">
import { ref } from 'vue'

import MainMenu from '@/components/main-menu/main-menu.vue'
import MainHeader from '@/components/main-header/main-header.vue'

const asideFold = ref(false)
function handleFoleChangeClick(isFold: boolean) {
  asideFold.value = isFold
}
</script>

<template>
  <div class="Main">
    <el-container>
      <el-aside :width="asideFold ? '50px' : '210px'">
        <main-menu :isFold="asideFold"></main-menu>
      </el-aside>
      <el-container>
        <el-header height="50px">
          <MainHeader @foldChange="handleFoleChangeClick"></MainHeader>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="less" scoped>
.el-container {
  height: 100vh;
}

.el-aside {
  overflow-x: hidden;
  overflow-y: auto;
  line-height: 200px;
  text-align: left;
  cursor: pointer;
  background-color: #001529;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */

  transition: width 0.3s ease;

  &::-webkit-scrollbar {
    display: none;
  }
}

.el-main {
  background-color: #f0f2f5;
}
</style>
