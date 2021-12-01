<template>
<div class='find'>
  <h1>发现</h1>
  <h1 v-text='username'></h1>
  <input type="text" v-model='name' />
  <button @click='changeUserName'>修改用户名</button>
</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'Find',
  data() {
    return {
      name: ''
    }
  },
  computed: {
    // 意思是，从test这个命名空间下映射state变量
    // 好处是，映射进来后，可以使用this来访问它们
    ...mapState('test', ['username'])
  },
  methods: {
    ...mapMutations('test', ['updateUserName']),
    changeUserName() {
      // 【完全不推荐使用】直接修改Vuex中的state
      // this.$store.state.username++

      // 【不推荐，但可以用】
      // 提交并触发一个名字叫updateUserName的mutaions方法去修改state
      // this.$store.commit('test/updateUserName', this.name)

      // 【Vuex终极推荐的写法】
      this.updateUserName(this.name)
    }
  }
}
</script>

<style lang="scss" scoped>
.find {
  background-color: white;
}
</style>
