<template>
<div class="qf-navbar">
  <van-nav-bar left-arrow @click-left='back'>
    <template #title>
      <slot name='default'></slot>
    </template>
    <template #right>
      <slot name='action'></slot>
    </template>
  </van-nav-bar>
</div>
</template>

<script>
export default {
  methods: {
    back() {
      this.$router.back()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
<style lang="scss">
.van-nav-bar__title {
  width: 7.95rem;
  max-width: 100%;
}
</style>
