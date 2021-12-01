<template>
<div class="page-detail">
  <QfNavBar>
    <template>
      <div v-text='info.name'></div>
    </template>
  </QfNavBar>
  <div class="info">
    <img :src="$img.imgBase+info.img" alt=""/>
    <div v-text='info.desc'></div>
    <div v-text='info.price'></div>
  </div>

  <!-- <QfAuth>
    <template #default='scope'>
      <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服" color="#ee0a24" />
        <van-goods-action-icon icon="cart-o" text="购物车" />
        <van-goods-action-icon icon="star" text="已收藏" color="#ff5000" />
        <van-goods-action-button type="warning" text="加入购物车" @click='addCart(scope)'/>
        <van-goods-action-button type="danger" text="立即购买" />
      </van-goods-action>
    </template>
  </QfAuth> -->

  <van-goods-action>
    <van-goods-action-icon icon="chat-o" text="客服" color="#ee0a24" />
    <van-goods-action-icon icon="cart-o" text="购物车" />
    <van-goods-action-icon icon="star" text="已收藏" color="#ff5000" />
    <van-goods-action-button type="warning" text="加入购物车" v-auth @click='addCart'/>
    <van-goods-action-button type="danger" text="立即购买" />
  </van-goods-action>


</div>
</template>

<script>
import { QfNavBar } from '@/components'
import { GoodsAction, GoodsActionIcon, GoodsActionButton } from 'vant'

export default {
  name: 'Detail',
  components: {
    QfNavBar,
    // QfAuth
    [GoodsAction.name]: GoodsAction,
    [GoodsActionIcon.name]: GoodsActionIcon,
    [GoodsActionButton.name]: GoodsActionButton
  },
  data() {
    return {
      info: {}
    }
  },
  created() {
    const id = this.$route.params.id
    this.$api.fetchGoodInfo({id}).then(res=>{
      console.log('商品详情', res)
      this.info = res.info
    })
  },
  methods: {
    addCart() {
      const data = {
        good_id: this.info._id,
        num: 1
      }
      this.$api.fetchCartAdd(data).then(()=>{
        this.$router.push('/cart')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.info {
  font-size: .4rem;
  img {
    display: block;
    width: 9.33rem;
    height: 9.33rem;
    margin: 0 auto;
  }
}
</style>
