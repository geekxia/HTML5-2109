<template>
<div class="qf-tabbar">
  <van-tabbar
    active-color="#FF2227"
    inactive-color="#8B8B8B"
    route
    safe-area-inset-bottom
  >
    <van-tabbar-item to='/'>
      <span>首页</span>
      <!-- #icon='scope', scope表示从子组件传递回来的数据 -->
      <template #icon='scope'>
        <img :src='$img[scope.active?"iHomeOn":"iHome"]' />
      </template>
    </van-tabbar-item>
    <van-tabbar-item icon="search" to='/find'>品类</van-tabbar-item>
    <van-tabbar-item icon="friends-o" to='/cart'>购物车</van-tabbar-item>
    <van-tabbar-item icon="setting-o" to='/user'>未登录</van-tabbar-item>
  </van-tabbar>
</div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
</style>
