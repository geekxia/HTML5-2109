<template>
<div class="good-list">
  <div class="row" v-for='i in n' :key='i'>
    <div @click='skipTo(list[2*i-2])'>
      <img :src="$img.imgBase+list[2*i-2].img" alt="">
      <div class="title" v-text='list[2*i-2].desc'></div>
      <div class="info">
        <span>￥</span>
        <span v-text='list[2*i-2].price'></span>
        <span>看相似</span>
      </div>
    </div>
    <div @click='skipTo(list[2*i-1])'>
      <img :src="$img.imgBase+list[2*i-1].img" alt="">
      <div class="title" v-text='list[2*i-1].desc'></div>
      <div class="info">
        <span>￥</span>
        <span v-text='list[2*i-1].price'></span>
        <span>看相似</span>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: {
    list: { type: Array, required: true }
  },
  computed: {
    n() {
      return Math.floor(this.list.length/2)
    }
  },
  methods: {
    skipTo(item) {
      this.$router.push('/detail/'+item._id)
    }
  }
}
</script>

<style lang="scss" scoped>
.good-list {
  .row {
    height: 7.31rem;
    display: flex;
    margin-top: .4rem;
    &>div {
      flex: 1;
      background-color: white;
      border-radius: .16rem;
      overflow: hidden;
      font-size: .35rem;
      line-height: .45rem;
      box-sizing: border-box;
      width: 4.61rem;
      margin: 0 .21rem;
      img {
        display: block;
        width: 4.61rem;
        height: 4.61rem;
        margin: 0 auto;
      }
      .title {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        font-size: .37rem;
        line-height: .45rem;
        height: .9rem;
        margin-top: .27rem;
      }
      .info {
        padding: .27rem 0;
        height: .69rem;
        overflow: hidden;
        line-height: .69rem;
        &>span:last-child {
          float: right;
          background-color: #f0f2f5;
          padding: .05rem .11rem;
          font-size: .32rem;
          border-radius: .11rem;
          height: .45rem;
          line-height: .45rem;
          margin-top: .08rem;
        }
        &>span:first-child {
          font-size: .35rem;
          color: red;
          font-weight: bold;
        }
        &>span:nth-child(2) {
          font-size: .43rem;
          color: red;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
