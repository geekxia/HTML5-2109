<template>
<div>
  <h1>我是首页</h1>

  <a-button type="primary">点击</a-button>

  <h1 v-text='msg'></h1>
  <h1 v-text='count'></h1>
  <button @click='setCount(-1)'>自减</button>
  <button @click='setCount(1)'>自增</button>
  <hr>
  <h1 v-text='odd'></h1>

  <Hello />
  <h1 v-color='"red"'>测试自定义指令</h1>
  <hr>

  <transition name='gp6' mode='out-in'>
    <h1 v-if='show'>我是白天</h1>
    <h1 v-else>我是黑夜</h1>
  </transition>
  <button @click='toggle'>显示与隐藏</button>
  <hr>

  <suspense>
    <template #default>
      <Hello />
    </template>
    <template #fallback>
      <div>Loading...</div>
    </template>
  </suspense>
  <hr>

  <!-- v-model:lang = v-bind:lang + v-on:update-lang -->
  <!-- v-model:color = v-bind:color + v-on:update-color -->
  <TestModel v-model:lang='lang' v-model:color.hehe.a.b.c='color' />
  <hr>

  <teleport to='.layer'>
    <div>我来自Home页面，但显示.layer。<span v-text='count'></span></div>
  </teleport>

  <teleport to='head'>
    <link rel="stylesheet" href="./src/assets/async.css">
  </teleport>

  <br><br><br><br>
</div>
</template>

<script>
import { defineComponent, ref, computed, onMounted, watch, defineAsyncComponent } from 'vue'
import { mapState } from 'vuex'


function useCount(arg) {
  let count = ref(arg)
  const setCount = val => {
    console.log('val', val)
    count.value += val
  }
  return [count, setCount]
}

// 异步组件（不能用于路由懒加载）
const Hello = defineAsyncComponent(async()=>{
  const s = await new Promise(resolve=>{
    setTimeout(()=>{
      resolve(import('./components/Hello.vue'))
    },2000)
  })
  return s
})

import TestModel from '@/components/TestModel.vue'

export default defineComponent({
  components: {
    Hello,
    TestModel,
    // ElButton
  },
  // setup 在所有生命周期之前运行
  setup(props,ctx) {

    const [count, setCount] = useCount(1000)
    const show = ref(true)

    const lang = ref('zh')
    const color = ref('red')

    const odd = computed(()=>count.value%7)
    onMounted(()=>{console.log('在这里调接口')})
    watch(odd, ()=>console.log('odd发生了变化'))

    const toggle = ()=>show.value=!show.value
    return {
      count,
      setCount,
      odd,
      show,
      toggle,
      lang,
      color
    }
  },
  computed: {
    ...mapState('todo', ['msg'])
  }
})

</script>

<style lang="css" scoped>
.gp6-enter-from,
.gp6-leave-to {
  opacity: 0;
}
.gp6-enter-active,
.gp6-leave-active {
  transition: all 2s;
}

.gp6-leave-from,
.gp6-enter-to {
  opacity: 1;
}
</style>
