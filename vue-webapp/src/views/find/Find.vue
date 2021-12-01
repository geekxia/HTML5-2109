<template>
<div class="page-find">

  <QfNavBar>
    <template>
      <van-search
        shape="round"
        placeholder="请输入搜索关键词"
      />
    </template>
    <template #action>
      ...
    </template>
  </QfNavBar>

  <div class="left">
    <van-sidebar v-model="curIdx">
      <van-sidebar-item v-for='item in cateArr' :key='item._id' :title='item.cate_zh' />
    </van-sidebar>
  </div>

  <div class="right">
    <van-grid :column-num='3'>
      <van-grid-item v-for='item in cache[this.curIdx]' :key='item._id'>
        <template>
          <div class='cate'>
            <img :src="$img.imgBase+item.img" alt="">
            <div v-text='item.name'></div>
          </div>
        </template>
      </van-grid-item>
    </van-grid>
  </div>

  <QfTabBar />
</div>
</template>

<script>
import { QfTabBar, QfNavBar } from '@/components'
import { mapActions, mapState, mapMutations } from 'vuex'
export default {
  name: 'Find',
  components: { QfTabBar, QfNavBar },
  data() {
    return {
      curIdx: 0,
      cateArr: []
    }
  },
  computed: {
    ...mapState('good', ['cache']),
    payload() {
      const idx = this.curIdx
      return {idx, cate: this.cateArr[idx].cate}
    }
  },
  watch: {
    curIdx() {
      // 每次左侧菜单发生变化时
      // 先判断缓存中是否有数据，如果没有才调接口
      if(!this.cache[this.curIdx]) {
        this.getList(this.payload)
      }
    }
  },
  async created() {
    const { list } = await this.$api.fetchAllCate()
    this.cateArr = list
    // this.getList(list[0].cate)
    this.getList(this.payload)
  },
  methods: {
    ...mapActions('good', ['getList']),
    ...mapMutations('good', ['cleanCache'])
  },
  beforeDestroy() {
    // 需求是，当前页面销毁时清除缓存
    this.cleanCache()
  }
}
</script>

<style lang="scss" scoped>
.page-find {
  position: relative;
  height: 100%;
  width: 100%;
  .left {
    position: absolute;
    top: 1.17rem;
    bottom: 1.33rem;
    left: 0;
    width: 2.27rem;
    overflow-y: auto;
  }
  .right {
    position: absolute;
    top: 1.17rem;
    bottom: 1.33rem;
    left: 2.27rem;
    right: 0;
    overflow-y: auto;
    .cate {
      img {
        display: block;
        width: 1.87rem;
        height: 1.87rem;
        margin: 0 auto;
      }
      font-size: .32rem;
      text-align: center;
    }
  }
}

.van-sidebar {
  width: 100%;
}
.van-sidebar-item--select::before {
  display: none;
}
.van-sidebar-item--select {
  color: red;
}
.van-search {
  height: .8rem;
  .van-search__content--round {
    border-radius: .4rem;
  }
  .van-search__content {
    height: .8rem;
    line-height: .8rem;
    .van-field__control {
      line-height: .8rem;
      font-size: .35rem;
    }
  }
}
</style>
<style lang="scss">
.van-nav-bar .van-icon {
  color: #aaaaaa;
}
</style>
