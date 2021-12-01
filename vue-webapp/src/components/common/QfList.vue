<template>
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <slot name='other'></slot>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :immediate-check='false'
      @load="onLoad"
    >
      <slot name='default'></slot>
    </van-list>
  </van-pull-refresh>
</template>

<script>
export default {
  props: {
    // 是列表调接口的页码（用于分页）
    value: { type: Number, required: true }
  },
  data() {
    return {
      // loading=true，触底功能失效
      loading: false,
      // finished=true，触底功能失效
      finished: false,
      // refreshing=true时，下拉刷新失效
      refreshing: false
    }
  },
  methods: {
    // 重要：给父组件使用，用于在调接口完成后来更新“我”的功能状态
    update(arr) {
      this.loading = arr[0]
      this.finished = arr[1]
      this.refreshing = arr[2]
    },
    // 下拉时触发这个事件
    onRefresh() {
      console.log('下拉刷新')
      // 每次下拉时，让页码等于1（间接会触发调接口）
      if(this.value>1) {
        this.$emit('input', 1)
      }else{
        this.$emit('input', this.value-1)
      }
    },
    // 页面滚动触发时执行这个事件
    onLoad() {
      console.log('触底分页')
      // 每次触底时，让页码自增（间接会触发调接口）
      if(this.value<1) {
        this.$emit('input', 2)
      }else{
        this.$emit('input', this.value+1)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
