<template>
<div class="qf-swipe">
  <van-swipe :autoplay="3000" indicator-color='#FF2227'>
    <!-- 为什么不建议使用index索引作Key？ -->
    <van-swipe-item v-for="item in images" :key="item.id">
      <img v-lazy="item.src" />
    </van-swipe-item>
  </van-swipe>
</div>
</template>

<script>
export default {
  data() {
    return {
      images: [
        { id: 1, src: '//m.360buyimg.com/mobilecms/s700x280_jfs/t1/199712/27/4566/129586/61244a8bEfec74456/e00134da503723fb.jpg!cr_1053x420_4_0!q70.jpg.dpg' },
        { id: 2, src: '//m.360buyimg.com/mobilecms/s700x280_jfs/t1/206742/26/2173/384737/614d925eEd64f4a96/9d7827d1ed571d8a.jpg!cr_1053x420_4_0!q70.jpg.dpg' },
        { id: 3, src: '//m.360buyimg.com/mobilecms/s700x280_jfs/t1/76849/26/16731/189399/6135b3f7E432aaf50/54d8413552fa1652.jpg!cr_1053x420_4_0!q70.jpg.dpg' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.van-swipe {
  height: 3.73rem;
  background-color: #B16F3A;
  img {
    display: block;
    width: 9.33rem;
    height: 3.73rem;
    margin: 0 auto;
    border-radius: .13rem;
  }
}
</style>
