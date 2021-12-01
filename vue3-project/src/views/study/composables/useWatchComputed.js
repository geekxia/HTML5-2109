import { ref, computed, watch, watchEffect } from 'vue'

export default function useWatchComputed() {
  const c1 = ref(10)
  const c2 = ref(20)

  const c3 = computed(()=>c1.value*c2.value)  // 只读
  // 可读也可写
  const c4 = computed({
    get: ()=>c1.value*c2.value,
    set: (newVal)=>{
      c1.value = parseInt(newVal) / c2.value
    }
  })

  const stop1 = watch(c4, (newC4, oldC4)=>console.log('c4变了', newC4, oldC4))
  const stop2 = watch([c1,c2], ([newC1,newC2],[oldC1,oldC2])=>{
    console.log('[c1,c2] 新值：', [newC1, newC2])
    console.log('[c1,c2] 旧值：', [oldC1, oldC2])
  })
  const stop3 = watchEffect(()=>{console.log('watch effect', c1.value, c2.value)})

  const update = (c,v) => c.value = v
  return [[c1,c2,c3,c4],[stop1,stop2,stop3,update]]
}
