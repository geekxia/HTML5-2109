<template>
<div v-if='show' class='qf-notdata' :style='{width}'>
  <img :src="$img.iNotData" />
  <div v-text='tip'></div>
</div>
</template>

<script>
export default {
  props: {
    width: { type: String, required: false, default: '50%' },
    tip: { type: String, required: false, default: '暂无数据' },
    show: { type: Boolean, required: false, default: false }
  }
}
</script>

<style lang="scss" scoped>
.qf-notdata {
  width: 50%;
  margin: .4rem auto;
  font-size: .37rem;
  line-height: 1.33rem;
  color: #aaaaaa;
  text-align: center;
  img {
    display: block;
    width: 100%;
  }
}
</style>
