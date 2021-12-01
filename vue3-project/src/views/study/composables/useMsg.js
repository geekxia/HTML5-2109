import { ref } from 'vue'

// const [[msg1,msg2], update] = useMsg()
export default function useMsg(arr) {
  const msg1 = ref(arr[0])
  const msg2 = ref(arr[1])

  const changeMsg = (newArr) => {
    msg1.value = newArr[0]
    msg2.value = newArr[1]
  }
  return [[msg1,msg2], changeMsg]
}
