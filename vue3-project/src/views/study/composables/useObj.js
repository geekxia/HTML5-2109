import { ref, shallowRef, triggerRef } from 'vue'

export default function useObj() {
  const obj = { a: 1, b: { c: { d: 2 }}}
  const obj1 = ref(obj)
  const obj2 = shallowRef(obj)
  // console.log('obj1', obj1)
  // console.log('obj2', obj2)

  const changeObj = (obj, newD) => {
    // obj1.value.b.c.d = 100
    obj.value.b.c.d = newD
    triggerRef(obj)
  }

  return [[obj1, obj2], changeObj]
}
