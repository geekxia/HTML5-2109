import { defineAsyncComponent } from 'vue'
// 异步组件（不能用于路由懒加载）
export default defineAsyncComponent(async()=>{
  const s = await new Promise(resolve=>{
    setTimeout(()=>{
      resolve(import('./HelloWorld.vue'))
    },2000)
  })
  return s
})
