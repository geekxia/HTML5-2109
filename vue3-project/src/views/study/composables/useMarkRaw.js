import { markRaw, reactive } from 'vue'

export default function useMarkRaw() {
  const b1 = markRaw({ title: 200 })
  console.log('b1', b1)
  const b2 = reactive(b1)
  console.log('b2', b2)   // 没有proxy
  return [b1,b2]
}
