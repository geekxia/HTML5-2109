<template>
<div class="qf-search">
  <van-search
    disabled
    shape="round"
    background="#B16F3A"
    :placeholder="searchPlace"
    show-action
  >
    <template #left>
      <div class="nav">三</div>
    </template>
    <template #action>
      <div style="color:white;">登录</div>
    </template>
    <template #left-icon>
      <div class="icon">
        <span>JD</span>
        <span>%</span>
      </div>
    </template>
  </van-search>
</div>
</template>

<script>
export default {
  data() {
    return {
      searchList: [
        { id: 1, name: '苹果笔记本', good_id: '1' },
        { id: 2, name: '蚕丝被', good_id: '2' },
        { id: 3, name: '小米手机', good_id: '3' }
      ]
    }
  },
  computed: {
    searchPlace() {
      return this.searchList[Math.floor(this.searchList.length*Math.random())].name
    }
  }
}
</script>

<style lang="scss" scoped>
.van-search {
  height: 1.17rem;
  padding-left: 0;
  .van-search__content {
    height: .8rem;
  }
}
.nav {
  font-size: .43rem;
  padding: 0 .2rem;
  color: white;
}
.icon {
  padding: 0 .07rem;
  &>span {
    display: inline-block;
    padding-right: .13rem;
  }
}
</style>
