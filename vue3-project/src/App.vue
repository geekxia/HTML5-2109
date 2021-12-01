<template>
  <router-view></router-view>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  // 使用组合API，可以替代掉vue2中的那些选项
  setup() {
    console.log('app setup')
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
