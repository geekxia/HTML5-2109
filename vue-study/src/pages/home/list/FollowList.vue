<template>
  <div>
    <div
      class="row"
      v-for='(item,index) in list'
      :key='item.id'
      @click='skipToDetail(item)'
    >
      <span v-text='index+1'></span>
      <span v-text='item.title'></span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'FollowList',
  data() {
    return {}
  },
  computed: {
    ...mapState('music', ['list'])
  },
  methods: {
    skipToDetail(item) {
      // 动态路由传参
      // this.$router.push(`/detail/${item.id}`)
      this.$router.push(`/d/${item.id}`)

      // this.$router.push({name:'dd',params:{id:item.id+''}})
      // Query传参
      // this.$router.push('/detail?id='+item.id)
    }
  }
}
</script>

<style lang="scss" scoped>
.row {
  line-height: 60px;
  cursor: pointer;
  border-bottom: 1px solid #ccc;
  padding: 0 15px;
}
</style>
