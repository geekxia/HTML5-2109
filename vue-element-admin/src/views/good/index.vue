<template>
<div class="app-container">
  <div class="filter">
    <!-- 栅格系统的一行 -->
    <el-row type='flex' align='middle'>

      <el-col :span="2">
        <span class="label">名称:</span>
      </el-col>
      <el-col :span="4">
        <el-input size='mini' v-model="name" placeholder="商品名称搜索"></el-input>
      </el-col>

      <el-col :span="2">
        <span class="label">品类:</span>
      </el-col>
      <el-col :span="4">
        <el-select v-model="cate" placeholder="请选择品类" size='mini'>
          <el-option value='1'>手机数码</el-option>
          <el-option value='2'>汽车生活</el-option>
        </el-select>
      </el-col>

      <el-col :span="2">
        <span class="label">日期:</span>
      </el-col>
      <el-col :span="6">
        <el-date-picker
          v-model="date"
          type="daterange"
          range-separator="至"
          size='mini'
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-col>

    </el-row>
  </div>

  <div class="table">

    <el-table
      :data="goodList"
      border
      size='mini'
      style="width: 100%">

      <el-table-column
        label="ID"
        width='50'
        align="center">
        <template slot-scope='scope'>
          <div v-text='scope.$index+1'></div>
        </template>
      </el-table-column>

      <el-table-column
        label="商品"
        align="center">
        <template slot-scope="scope">
          <div class="good">
            <img :src='scope.row.img' alt=""/>
            <div v-text='scope.row.name'></div>
          </div>
        </template>
      </el-table-column>

      <el-table-column
        align='center'
        sortable
        :sort-method='sortByPrice'
        label="价格">
        <template slot-scope='scope'>
          <div v-text='`￥${scope.row.price}元`'></div>
        </template>
      </el-table-column>

      <el-table-column
        align='center'
        label="状态">
        <template slot-scope='scope'>
          <div v-text='scope.row.status?"上架":"下架"'></div>
        </template>
      </el-table-column>

      <el-table-column
        align='center'
        label="创建时间">
        <template slot-scope='scope'>
          <div v-text='handleDate(scope.row.create_time)'></div>
        </template>
      </el-table-column>

      <el-table-column label="操作" align='center'>
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleRow(scope.$index, scope.row, 1)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleRow(scope.$index, scope.row, 2)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <div class="page">
    <!-- <el-pagination
      @size-change="sizeChange"
      @current-change="pageChange"
      :current-page="1"
      :page-sizes="[5, 10, 20, 50]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination> -->
    <pagination v-show="total>0" :total="total" :page.sync="page" :limit.sync="limit" @pagination="getList" />
  </div>
</div>
</template>

<script>
import moment from 'moment'
console.log('moment', moment)
import pagination from '@/components/Pagination' // Secondary package based on el-pagination
export default {
  components: { pagination },
  data() {
    return {
      name: '',
      cate: '',
      date: [],
      page: 1,
      limit: 5,
      total: 100,
      goodList: [
        { id: 1, name: '小米手机', img: '//img30.360buyimg.com/img/s100x100_jfs/t1/204292/5/10027/178755/615ee52fE8255d8f6/0152c2e922e676ad.jpg!cc_100x100.webp', price: '300', status: 1, create_time: 1633673669870 },
        { id: 2, name: '小米手机', img: '//img30.360buyimg.com/img/s100x100_jfs/t1/204292/5/10027/178755/615ee52fE8255d8f6/0152c2e922e676ad.jpg!cc_100x100.webp', price: '400', status: 1, create_time: 1633673669870 },
        { id: 3, name: '小米手机', img: '//img30.360buyimg.com/img/s100x100_jfs/t1/204292/5/10027/178755/615ee52fE8255d8f6/0152c2e922e676ad.jpg!cc_100x100.webp', price: '500', status: 1, create_time: 1633673669870 }
      ]
    }
  },
  methods: {
    getList() {
      console.log('调接口查询列表')
    },
    handleDate(stamp) {
      return moment(stamp).format("YYYY年MM月DD日")
    },
    sortByPrice(a,b) {
      return a.price - b.price
    },
    handleRow(idx, row, type) {
      console.log(idx, row, type)
    }
  }
}
</script>

<style lang="scss" scoped>
.filter {
  font-size: 14px;
  background: #eeeeee;
  padding: 20px 0;
  margin-bottom: 10px;
}
.el-row {
  .label {
    display: block;
    text-align: right;
    padding-right: 5px;
  }
}
.table {
  .good {
    text-align: center;
    img { display: inline-block; width: 60px; height: 60px; }
  }
}
.page {
  // margin-top: 50px;
  // text-align: right;
}
</style>
