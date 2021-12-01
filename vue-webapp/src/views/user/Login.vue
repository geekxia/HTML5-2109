<template>
<div class="page-form">

  <QfNavBar>
    <div>登录</div>
  </QfNavBar>

  <van-form @submit="onSubmit">
    <van-field
      v-model="username"
      name="username"
      label="用户名"
      placeholder="用户名"
      :rules="[
        { required: true, message: '请填写用户名' }
      ]"
    />
    <van-field
      v-model="password"
      type="password"
      name="password"
      label="密码"
      placeholder="密码"
      :rules="[{ required: true, message: '请填写密码' }]"
    />
    <div style="margin: 16px;">
      <van-button round block type="info" native-type="submit">登录</van-button>
    </div>
  </van-form>
</div>
</template>

<script>

import { QfNavBar } from '@/components'
import md5 from 'md5'
export default {
  components: {
    QfNavBar
  },
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    onSubmit(data) {
      data.password = md5(data.password)
      this.$api.fetchLogin(data).then(res=>{
        console.log('登录成功', res)
        // token放在哪里保存？localStorage、vuex、cookie
        localStorage.setItem('token', res.token)
        this.$router.back()

        // 因为HTTP是无状态的短连接，所以客户端和服务端的交互需要鉴权，
        // 客户发起登录请求，login成功后，服务器必须有能力识别已登录的用户，
        // 所以login成功时，服务器会根据用户信息生成一个token并响应给客户端。

        // 客户端要把token存储起来，以后每次发生其它HTTP请求时都要带上token，
        // 服务端有反解析token的能力，就可以识别当前HTTP是哪个用户发起的，
        // 服务端就根据当前用户信息，给你想要的业务数据。

        // 如果客户端给的token有误或过期了，服务端解析token会失败。
        // token解析失败，预示着客户端拿不到任何的业务数据。
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
