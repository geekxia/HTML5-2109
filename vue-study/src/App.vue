<template>
  <div class="app">
    <Nav />
    <Main />
  </div>
</template>

<script>
// 导入一个Vue组件（它不是Vue.component()定义的全局组件）
// import TodoList from './components/TodoList.vue'
// 定义vue组件，抛出一个选项，在这个选项中可以使用我们前面学过的组件选项
import { Nav, Main } from '@/components'
export default {
  name: 'App',
  // 用于定义局部组件，表示组件注册。
  components: { Nav, Main },
  // 侦听器可以监听$route的变化
  watch: {
    // $route(to, from) {
      // console.log('to', to)
      // console.log('from', from)
    // }
  },
  mounted() {
    // console.log('$route', this.$route)
    // console.log('$router', this.$router)
  }
}
</script>

<style lang='scss'>
html,body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
.app {
  background: rgba(246, 246, 246, 1);
  height: 100%;
  width: 100%;
}
</style>
