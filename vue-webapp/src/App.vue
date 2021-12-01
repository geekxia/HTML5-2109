<template>
<div class="app">

  <keep-alive>
    <!-- 命名视图 -->
    <router-view name='alive'></router-view>
  </keep-alive>
  <router-view></router-view>

</div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>
html,body { margin: 0; padding: 0; height: 100%; width: 100%; }
.app { height: 100%; width: 100%; }
</style>
