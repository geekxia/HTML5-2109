<template>
<div class="page-form">

  <QfNavBar>
    <div>注册</div>
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
    <van-field
      v-model="password2"
      type="password"
      name="password2"
      label="确认密码"
      placeholder="密码"
      :rules="[{ required: true, message: '请填写密码' }]"
    />
    <div style="margin: 16px;">
      <van-button round block type="info" native-type="submit">立即注册</van-button>
    </div>
  </van-form>
</div>
</template>

<script>

import { QfNavBar } from '@/components'
import md5 from 'md5'
console.log('md5', md5)
export default {
  components: {
    QfNavBar
  },
  data() {
    return {
      username: '',
      password: '',
      password2: ''
    }
  },
  methods: {
    onSubmit(data) {
      // 表单验证
      console.log('data', data)
      if (data.password===data.password2) {
        data.password = md5(data.password)
        delete data.password2
        this.$api.fetchRegist(data).then(()=>{
          // push() back() replace()
          this.$router.replace('/login')
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
