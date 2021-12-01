<template>
<div class="vip">
  <h1>会员中心</h1>
  <h1 v-text='username'></h1>
  <h1 v-text='qf'></h1>
</div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapState('test', ['username']),
    ...mapGetters('test', ['qf'])
  },
  mounted() {
    console.log('store', this.$store)

    // 派发并触发一个名字叫getUserInfo的actions方法
    // this.$store.dispatch('test/getUserInfo')
    this.getUserInfo()
  },
  methods: {
    ...mapActions('test', ['getUserInfo'])
  }
}
</script>

<style lang="scss" scoped>
.vip {
  background-color: white;
}
</style>
