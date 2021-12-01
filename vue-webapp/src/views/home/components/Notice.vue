<template>
<div class="qf-notice-bar">
  <!-- 通知栏 -->
  <van-notice-bar
    background='#333333'
    color='#ffffff'
    v-if='noticeBol'
  >
    <template #left-icon>
      <div class="close" @click='noticeBol=false'>X</div>
    </template>
    <template #default>
      JD  打开京东APP，购物更轻松
    </template>
    <template #right-icon>
      <div class="open">立即打开</div>
    </template>
  </van-notice-bar>
</div>
</template>

<script>
export default {
  data() {
    return {
      noticeBol: true
    }
  }
}
</script>

<style lang="scss" scoped>
.van-notice-bar {
  height: 1.2rem;
  padding-right: 0;
}
.close {
  width: .8rem;
}
.open {
  width: 2.45rem;
  height: 100%;
  line-height: 1.2rem;
  text-align: center;
  background-color: #f63515;
}
</style>
