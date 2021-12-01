<template>
  <div class="row">
    <span
      v-for='item in arr1'
      :key='item.id'
      :class='{"on":item.value===lang}'
      @click='changeLang(item)'
      v-text='item.label'>
    </span>
  </div>

  <div class="row">
    <span
      v-for='item in arr2'
      :key='item.id'
      :class='{"on":item.value===color}'
      @click='changeColor(item)'
      v-text='item.label'>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    lang: { type: String, default: 'zh' },
    color: { type: String, default: 'red' },
    colorModifiers: {
      default: () => ({})
    }
  },
  emits: ['update:lang', 'update:color'],
  data() {
    return {
      arr1: [
        {id:1,label:'中文',value:'zh'},
        {id:2,label:'英文',value:'en'},
        {id:3,label:'法语',value:'fr'}
      ],
      arr2: [
        {id:1,label:'红色',value:'red'},
        {id:2,label:'绿色',value:'green'},
        {id:3,label:'蓝色',value:'blue'}
      ]
    }
  },
  methods: {
    changeLang(item) {
      console.log('item', item.value)
      this.$emit("update:lang", item.value)
    },
    changeColor(item) {
      // let res = item.value
      console.log('自定义修饰符', this.colorModifiers)
      const { hehe } = this.colorModifiers
      // if(mytrim) { res = res.trim() }
      if(hehe){
        // do something
      }
      this.$emit("update:color", item.value)
    }
  }
}
</script>

<style lang="css" scoped>
.row {
  margin-top: 20px;
}
.row span {
  display: inline-block;
  padding: 0 20px;
}
.row span.on {
  background-color: orange;
}
</style>
