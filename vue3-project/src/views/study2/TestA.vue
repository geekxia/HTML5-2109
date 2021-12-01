<template>
<div>
  <h1>我是test a 页面</h1>
  <h1 v-text='num'></h1>
  <button @click='add'>自加</button>
</div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'

function useNum(arg) {
  // 定义响应式变量
  const num = ref(arg)
  const add = () => {
    num.value++
  }
  return [num, add]
}

export default defineComponent({
  setup(props, ctx) {
    const [num, add] = useNum(2000)

    onMounted(()=>{
      console.log('调接口')
    })
    return {
      num,
      add
    }
  }
})
</script>

<style lang="css" scoped>
</style>
