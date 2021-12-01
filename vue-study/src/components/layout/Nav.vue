<template>
  <div class="nav">
    <div>
      <span>LOGO</span>
      <span class="wrap">
        <!-- tag用于指定用什么标签来渲染DOM树 -->
        <!-- active-class用于指定菜单的高亮样式的类名 -->
        <router-link
          v-for='item in navs'
          :key='item.path'
          :to='item.path'
          v-text='item.text'
          tag='span'
          :class='{"on": $route.meta.path===item.path }'
        ></router-link>
      </span>
      <span>
        <input type="text" v-model.trim='star' @keyup.enter='search' />
      </span>
      <span>提问</span>
    </div>
  </div>
</template>

<script>

// @，在vue脚手架中，表示绝对路径，它指向 src 根目录
import { navs } from '@/router.js'
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      navs,
      star: ''
    }
  },
  methods: {
    ...mapActions('music', ['getList']),
    search() {
      this.getList({w:this.star})
    }
  }
}
</script>

<style lang="scss" scoped>
.nav {
  background: white;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 50px;
  &>div {
    width: 800px;
    margin: 0 auto;
  }
  .wrap {
    span {
      display: inline-block;
      cursor: pointer;
      line-height: 46px;
      box-sizing: border-box;
      border-bottom: 4px solid transparent;
      margin: 0 10px;
    }
    span.on {
      border-bottom-color: blue;
    }
  }
}
</style>
