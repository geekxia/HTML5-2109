<template>
<div class="detail">
  <h1>音乐详情页</h1>
</div>
</template>

<script>
export default {
  props: {
    id: { type: String, required: true }
  },
  mounted() {
    console.log('$route', this.$route)
    // 1、动态路由传参，使用this.$route.params.id接收动态路由参数
    console.log('使用id调接口', this.$route.params.id)

    // 2、动态路由传参，使用props选项来接收动态路由参数
    // console.log('使用id调接口', this.id)

    // 3、Query传参，使用this.$route.query.id接收query参数
    // console.log('使用id调接口', this.$route.query.id)
  }
}
</script>

<style lang="scss" scoped>
.detail {
  background: white;
  padding: 15px;
}
</style>
