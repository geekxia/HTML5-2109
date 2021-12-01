import { reactive, shallowReadonly } from 'vue'

export default function useShallow() {
  const n = shallowReadonly(reactive({a:{b:{c:{d:100}}}}))
  // setTimeout(()=>n.a.b.c.d=2000, 2000)
  return n
}
