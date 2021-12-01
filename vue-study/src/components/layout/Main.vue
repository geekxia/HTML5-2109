<template>
  <div class='content'>
    <!-- 为了实现“单页面应用程序”：当url发生变化时，这里要显示的组件是变化的。 -->
    <!-- 如何理解<router-view>? -->
    <!-- 你可以把<router-view>理解成路由系统中的“一张椅子”，用于显示当前url所对应的Vue组件 -->
    <!-- 命令视图，给<router-view>取个名字，它默认default -->

    <router-view name='default'></router-view>
    <keep-alive>
      <router-view name='alive'></router-view>
    </keep-alive>

  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.content {
  width: 800px;
  margin: 0 auto;
  height: 100%;
  padding-top: 60px;
  box-sizing: border-box;
}
</style>
