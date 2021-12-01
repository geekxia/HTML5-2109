<template>
<div class="app-container">
  <el-form :model="goodForm" :rules="rules" ref="goodForm" label-width="100px" class="demo-goodForm">

    <el-form-item label="商品名称" prop="name" inline-message>
      <el-input v-model="goodForm.name"></el-input>
    </el-form-item>

    <el-form-item label="活动区域" prop="region">
      <el-select v-model="goodForm.region" placeholder="请选择活动区域">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="活动时间" required>
      <el-col :span="11">
        <el-form-item prop="date1">
          <el-date-picker type="date" placeholder="选择日期" v-model="goodForm.date1" style="width: 100%;"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col class="line" :span="2" style='text-align:center;'>-</el-col>
      <el-col :span="11">
        <el-form-item prop="date2">
          <el-time-picker placeholder="选择时间" v-model="goodForm.date2" style="width: 100%;"></el-time-picker>
        </el-form-item>
      </el-col>
    </el-form-item>

    <el-form-item label="即时配送" prop="delivery">
      <el-switch v-model="goodForm.delivery"></el-switch>
    </el-form-item>

    <el-form-item label="活动性质" prop="type">
      <el-checkbox-group v-model="goodForm.type">
        <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
        <el-checkbox label="地推活动" name="type"></el-checkbox>
        <el-checkbox label="线下主题活动" name="type"></el-checkbox>
        <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
      </el-checkbox-group>
    </el-form-item>

    <el-form-item label="特殊资源" prop="resource">
      <el-radio-group v-model="goodForm.resource">
        <el-radio label="线上品牌商赞助"></el-radio>
        <el-radio label="线下场地免费"></el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="商品图片" prop="img">
      <upload v-model='goodForm.img'></upload>
    </el-form-item>

    <el-form-item label="活动形式" prop="desc">
      <el-input type="textarea" v-model="goodForm.desc"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submit">立即添加</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
import upload from '@/components/Upload/SingleImage'
export default {
  components: { upload },
  data() {
    return {
      goodForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        img: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submit() {
      console.log('提交', this.goodForm)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-form {
  max-width: 70%;
}
</style>
<style>
.image-preview {
  display: none;
}
</style>
