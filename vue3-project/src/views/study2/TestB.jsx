
import { defineComponent, ref } from 'vue'

function useNum(arg) {
  const num = ref(arg)
  const add = () => {
    num.value++
  }
  return [num, add]
}

export default defineComponent({
  setup () {
    const [count, setCount] = useNum(4000)
    const [num, setNum] = useNum(8000)
    return ()=>(
      <div>
        <h1>我是 test b 页面</h1>
        <h1>{count.value}</h1>
        <button onClick={setCount}>自增</button>
        <hr/>

        <h1>{num.value}</h1>
        <button onClick={setNum}>自增</button>
      </div>
    )
  }
})
