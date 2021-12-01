<template>
<div
  class="page-home"
  @scroll='top=$event.srcElement.scrollTop'
  ref='home'
>

  <Notice />

  <QfList v-model='page' ref='qflist'>
    <template #other>
      <Search />
      <Swipe />
    </template>
    <template>
      <GoodList :list='list' />
    </template>
  </QfList>

  <QfTabBar />
</div>
</template>

<script>
import { QfTabBar, QfList } from '@/components'
import Notice from './components/Notice.vue'
import Search from './components/Search.vue'
import Swipe from './components/Swipe.vue'
import GoodList from './components/GoodList.vue'
export default {
  name: 'Home',
  components: {
    QfTabBar,
    Notice,
    Search,
    Swipe,
    GoodList,
    QfList
  },
  data() {
    return {
      page: 1,
      list: [],
      top: 0
    }
  },
  watch: {
    // page与QfList这个类表单有关
    page(){
      this.getList()
    }
  },
  created() {
    this.getList()
  },
  activated() {
    // 每次Home复活时，手动地把页面滚动到上一次的位置
    // 解决vant的tabbar的问题
    this.$refs.home.scrollTop = this.top
  },
  methods: {
    getList() {
      const p = this.page<1 ? 1 : this.page
      this.$api.fetchGoodList({page:p,size:6}).then(res=>{
        console.log('商品列表', res)
        if (this.page<=1) {
          // 如果是下拉刷新（初始化第一次加载） this.list = res.list
          this.list = res.list
        } else {
          // 如果是触底分页，this.list = [...]
          this.list = [...this.list, ...res.list]
        }
        // 更新QfList组件的功能状态
        this.$refs.qflist.update([false, this.list.length===res.total, false])
      })
    },
    // 功能：监听页面的滚动事件
    pageScroll(e) {
      // console.log('scroll', e.srcElement.scrollTop)
      // 实时记录滚动条的位置
      this.top = e.srcElement.scrollTop
    }
  }
}
</script>

<style lang="scss" scoped>
.page-home {
  background-color: rgba(247, 247, 247, 1);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 2rem;
  overflow: scroll;
}
</style>
