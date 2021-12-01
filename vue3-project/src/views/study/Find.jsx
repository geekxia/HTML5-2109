import { defineComponent, toRefs, inject, h } from 'vue'

// 自定义封装hooks（把响应式数据和业务逻辑分离出来）
import useApp from './composables/useApp'
import useInit from './composables/useInit'
import useMarkRaw from './composables/useMarkRaw'
import useMsg from './composables/useMsg'
import useObj from './composables/useObj'
import useRaw from './composables/useRaw'
import useShallow from './composables/useShallow'
import useUpdBoxStyle from './composables/useUpdBoxStyle'
import useUser from './composables/useUser'
import useUserList from './composables/useUserList'
import useWatchComputed from './composables/useWatchComputed'

// 子组件
const Child = defineComponent({
  // 用于接收父组件传递过来的自定义属性
  props: {
    msg: { type: String, default: '' },
    onChange: { type: Function }
  },
  // 用于接收父组件传递过来的自定义事件
  // 父组件给的事件名叫“onChange”，在这个用change接收
  emits: ['change'],
  setup(props, ctx) {
    console.log('child ctx', ctx)
    // 当我们直接解构props时，响应式会失效，建议使用toRef/toRefs进行包裹
    // console.log('child props', props)
    // let msg = toRef(props, 'msg')
    let { msg } = toRefs(props)
    // console.log('msg', msg)
    const inputChange = e => {
      console.log('child input', e.target.value)
      // ctx.emit('change', e.target.value)
      props.onChange(e.target.value)
    }
    // 注入祖宗组件提供的数据
    const hello = inject('hello')
    console.log('child hello -----', hello)
    return ()=>(
      <div>
        <h2>我是孩子：{msg.value}</h2>
        <input type="text" value={msg.value} onInput={inputChange} />
      </div>
    )
  }
})

export default {
  // setup 是组件的入口函数，在所有的生命周期之前就运行
  // 所以在 setup 是无法访问this的
  setup(props, ctx) {

    const { num } = useInit()
    const [box, updateBox] = useUpdBoxStyle()
    const [list, addUser] = useUserList()
    const [[msg1, msg2], updateMsg] = useMsg(['1','2'])
    const [[obj1, obj2], updateObj] = useObj()
    const user = useUser()
    const [a1,a2,a3] = useRaw()
    const n = useShallow()
    const [[c1,c2,c3,c4],[stop1,stop2,stop3,updateC]] = useWatchComputed()
    setTimeout(()=>{
      stop1()
      stop2()
      stop3()
    }, 10000)

    return () => (
      <div>
        <a-button type="primary">点击</a-button>

        <h1>{num.value}</h1>

        <h1 ref={box}>我是一行文字</h1>
        <button onClick={()=>updateBox('blue')}>修改box的样式</button>
        <hr/>

        {
          list.map(ele=>(
            <div key={ele.id}>
              <span>{ele.id}</span>
              --
              <span>{ele.name}</span>
            </div>
          ))
        }
        <button onClick={()=>addUser({id:12,name:'hehe'})}>添加用户</button>
        <hr/>

        <Child msg={msg1.value} onChange={e=>msg1.value=e} />
        <Child msg={msg2.value} onChange={e=>msg2.value=e} />
        <button onClick={()=>updateMsg(['200','300'])}>修改MSG</button>
        <hr/>

        <h1>{obj2.value.b.c.d}</h1>
        <button onClick={()=>updateObj(obj2,1000)}>修改obj2对象</button>
        <hr/>

        <h1>{user.age}</h1>
        <hr/>

        <h1>{a2.title}</h1>
        <hr/>

        <h1>{n.a.b.c.d}</h1>
        <hr/>

        <div>
          <span>{c1.value}</span>
          X
          <span>{c2.value}</span>
          =
          <span>{c3.value}</span>
          <br/>
          <button onClick={()=>c1.value++}>修改C1</button>
        </div>
        <hr/>

        <input type="number" value={c4.value} onInput={(e)=>updateC(c4,e.target.value)} />
        <br/>
        <hr/>
      </div>
    )
  }
}
