<template>
<div class="home">
  <div class="left">
    <!-- 二级菜单 -->
    <div class="navs">
      <router-link
        v-for='item in subNavs'
        :key='item.path'
        :to='item.path'
        v-text='item.text'
        tag='span'
        active-class='on'
       >
       </router-link>
    </div>

    <!-- 这就是 -->
    <router-view></router-view>

  </div>
  <div class='right'>
    <Tools />
  </div>
</div>
</template>

<script>
import Tools from './components/Tools.vue'
import { navs } from '@/router.js'
export default {
  name: 'Home',
  components: {
    Tools
  },
  data() {
    return {
      subNavs: navs[0].children
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  position: relative;
  width: 100%;
  height: 100%;
  .left {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 550px;
    background: white;
    .row {
      line-height: 60px;
      cursor: pointer;
      border-bottom: 1px solid #ccc;
      padding: 0 15px;
    }
  }
  .right {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 240px;
    background: white;
  }
}

.navs {
  span {
    display: inline-block;
    padding: 0 10px;
    cursor: pointer;
    line-height: 50px;
  }
  span.on {
    color: red;
  }
}
</style>
