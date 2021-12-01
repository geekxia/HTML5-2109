<template>
<div class="page-cart">

  <QfNavBar>
    <template>
      购物车
    </template>
    <template #action>
      搜索
    </template>
  </QfNavBar>

  <QfNotData
    tip='购物车暂无数据'
    width='40%'
    :show='!loading && list.length===0'
  />

  <van-swipe-cell v-for='(item,index) in list' :key='item.id'>

    <van-row type='flex' align='center'>
      <van-col span="3">
        <van-checkbox v-model='item.checked' @click='rowClick(index)'></van-checkbox>
      </van-col>
      <van-col span="21">
        <van-card
          :num="item.num"
          :price="item.good_info.price"
          :desc="item.good_info.desc"
          :title="item.good_info.name"
          class="goods-card"
          :thumb="$img.imgBase+item.good_info.img"
        >
        <template #footer>
          <div class="hot" @click='rowUpd(item,"sub", index)'>
            <van-button size="mini">-</van-button>
          </div>
          <div class="hot" style="padding-right:0;" @click='rowUpd(item,"add", index)'>
            <van-button size="mini">+</van-button>
          </div>
        </template>
        </van-card>
      </van-col>
    </van-row>

    <template #right>
      <van-button
        square text="删除"
        type="danger"
        class="delete-button"
        @click='rowDel(item, index)'
      />
    </template>
  </van-swipe-cell>

  <van-submit-bar :price="total" button-text="提交订单" @submit="onSubmit">
    <van-checkbox v-model="full" @click='fullClick'>全选</van-checkbox>
  </van-submit-bar>

</div>
</template>

<script>
import { QfNavBar, QfNotData } from '@/components'
import { Dialog } from 'vant'  // JS组件
export default {
  name: 'Cart',
  components: {
    QfNavBar,
    QfNotData
  },
  data() {
    return {
      full: false,
      loading: false,
      list: []
    }
  },
  computed: {
    total() {
      var t = 0
      this.list.map(ele=>{
        if(ele.checked) {
          t += ele.num * ele.good_info.price * 100
        }
      })
      return t
    }
  },
  created() {
    this.init()
  },
  methods: {
    // 封装：用于初始化请求、页面刷新
    init() {
      this.loading = true
      this.$api.fetchCartList().then(res=>{
        console.log('购物车列表', res)
        this.list = res.list
        this.loading = false
        this.isFull()
      })
    },
    // 功能：删除一行
    rowDel(item, index) {
      Dialog.confirm({
        title: '提示',
        message: `你确定要删除 ${item.good_info.name} 吗？`,
      }).then(() => {
        this.$api.fetchCartDel({cart_id:item._id})
          .then(()=>{
            // this.isFull()
            // this.init()
            this.list.splice(index, 1)
            this.isFull()
          })
      })
    },
    // 功能：更新商品数量
    rowUpd(item, flag, index) {
      const data = {
        cart_id: item._id,
        new_num: item.num
      }
      if (flag==='add') {
        data.new_num++
      } else {
        if(data.new_num===1) return
        data.new_num--
      }
      this.$api.fetchCartUpd(data)
        .then(()=>{
          // this.init()
          this.list[index].num = data.new_num
        })
    },
    // 封装：用于判断当前状态是否全选
    isFull() {
      const arr = this.list.filter(ele=>!ele.checked)
      this.full = arr.length===0
      // 当list的长度为0时，不全选
      if(this.list.length===0) this.full = false
    },
    // 功能：点击每行Checkbox时
    rowClick(index) {
      console.log('index', index, this.list[index].checked)
      // this.list[index].checked = !this.list[index].checked
      this.isFull()
      // this.$forceUpdate()
      // this.calTotal()
      this.list = JSON.parse(JSON.stringify(this.list))
    },
    // 功能：点击全选按钮时
    fullClick() {
      console.log('full', this.full)
      this.list.map((ele,idx)=>{
        this.list[idx].checked = this.full
      })
      // this.$forceUpdate()
      // this.calTotal()
      this.list = JSON.parse(JSON.stringify(this.list))
    },
    // 功能：提交购物车
    onSubmit() {
      console.log('提交购物车')
      if (this.total>0) {
        // ids 表示购买的商品列表的购物车_id
        let ids = ''
        this.list.map(ele=>{
          if (ele.checked) ids += `;${ele._id}`
        })
        this.$api.fetchCartSub({ids})
          .then(()=>{
            this.$toast('购买成功')
            this.init()
          })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.page-cart {
  padding-bottom: 1.6rem;
}
.delete-button {
  height: 100%;
}
.van-card{
  background-color: white;
  padding-left: 0;
}
.van-swipe-cell {
  border-bottom: 1px solid #eee;
}
.hot {
  display: inline-block;
  padding: 0 .13rem;
}
</style>

<style lang="scss">
.van-checkbox__icon {
  margin: 0 auto;
}
</style>
