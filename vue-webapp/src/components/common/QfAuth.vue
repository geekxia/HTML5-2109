<template>
  <div class="qf-auth">
    <!-- 表示从QfAuth组件的default插槽向父组件传递数据 -->
    <slot :auth='isLogin' userinfo=''></slot>
  </div>
</template>

<script>

export default {
  data() {
    return {
      isLogin: localStorage.getItem('token')
    }
  }
}
</script>

<style lang="scss" scoped>
.qf-auth { display: inline-block; }
</style>
