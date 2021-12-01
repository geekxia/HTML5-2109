import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react'

// 两种组件：类组件、函数式组件
// 类组件中，不能使用Hooks。
// 函数式组件中，除props外，其它什么也没有。但是在16.8以后可以Hooks。

// Hooks
// 一、useState 模拟类组件中state的特性
  // 语法：const [xx, setXx] = useState('初始值')
  // 特点：用setXx来修改xx，这将触发当前函数重新执行，return生成新的jsx对象，进一步发生“协调”，提交更新视图。
  // 定义state时，为什么是 []中括号？使用 [] 语法进行解构，可随意修改变量名。

// 二、useEffect 模拟类组件中生命周期的特性
  // 语法：useEffect(()=>{return ()=>{}}, [])
  // 作用：用于执行各种各样的副作用。
  // 常用的副作用有：调接口、DOM操作、ref操作、定时器、长连接、状态管理工具的使用。

  // 使用原则：在同一个函数式组件中可以同时使用多个useEffect，但建议一个useEffect只执行一个副作用。

// 三、useContext 用于从组件树中取出上下文数据
  // 语法：const ctx = useContext('React上下文对象')

// 四、useMemo  用于缓存昂贵的计算
  // 语法：const cc = useMemo(expensiveCalFn, ['在这里放置用于计算的那些state变量'])

// 五、useCallback  用于缓存复杂的函数（公共方法、事件处理器）
  // 语法：const fn = useCallback(fn, [])

// 六、useRef  一种快捷访问DOM或组件实例的方式。
  // 定义ref对象：const r = useRef(null)
  // 使用ref对象：r.current


// 【总结】

// 1、useState用于模拟声明一个响应式变量，当使用set*方法修改当前变量时，那么当前整个函数式组件都会重新执行，接着生成新Fiber，进一步执行“协调(可中断)”，最终“提交”DOM渲染(不可中断)。
  // 特点：set*在修改响应式变量时，会影响 useEffect/useMemo/useCallback。。。

// 2、useEffect(()=>{ startFn(); return endFn;}, [])
  // 2-1 如果没有[]这个参数，当前组件初始化startFn执行，endFn不执行；以后发生风吹草动，endFn先执行，startFn再执行。
  // 2-2 如果有[]这个参数且是空数组，当前组件初始化startFn执行，endFn不执行；以后发生风吹草动，startFn和endFn都不会再执行。
  // 2-3 如果有['响应式变量',...]这个参数且有元素，当前组件初始化startFn执行，endFn不执行；以后有且仅有当['响应式变量',...]发生风吹草动时，endFn先执行，startFn再执行。

// 3、useMemo(fn, ['依赖列表'])，初始化时useMemo(fn)返回一个具体的值；以后有且仅有当依赖列表发生风吹草动，都会重新运算fn。

import { useTheme } from '@/utils/theme'
import { Button } from 'antd'

export default () => {
  console.log('当前函数式组件重新执行了')
  const [count, setCount] = useState(0)
  const [bol, setBol] = useState(true)
  const [num, setNum] = useState(100)
  const box = useRef(null)
  const theme = useTheme()
  const [name, setName] = useState('')

  // setInterval(()=>{
  //   setNum(num+1)
  // }, 1000)

  const calCount = useMemo(()=>{
    console.log('calCount运行了')
    // 复杂的计算逻辑
    return count*100
  }, [count])   // 昂贵的计算

  // const full = useMemo(()=>{
  //   return first + ' ' + last
  // }, [first, last])

  const handler = useCallback(()=>{
    // do something
    // 复杂的业务逻辑
    console.log('clicked')
  }, [])

  useEffect(()=>{
    // 【相当于是componentDidMount()】
    // 执行副作用
    // console.log('开启定时器')
    const timer = setInterval(()=>{
      setNum(num+1)
    }, 1000)

    return ()=>{
      // 【相当于是componentWillUnmount()】
      // 清理副作用
      clearInterval(timer)
      // console.log('关闭定时器')
    }
  }, [num]) //【这个[]相当于componentDidUpdate()】

  useEffect(()=>{
    console.log('----dom操作开始')
    document.title = '高薪就业'
    return ()=>{
      console.log('----dom操作结束')
    }
  }, [count, bol])

  return (
    <div style={theme}>
      <h1>学习Hooks</h1>

      <hr/>
      <h1>Count：{ count }</h1>
      <h1>基于Count的昂贵计算：{ calCount }</h1>
      <button onClick={()=>setCount(count+1)}>自增</button>

      <hr/>
      <h1>{ bol ? '真' : '假' }</h1>
      <button onClick={()=>setBol(!bol)}>切换</button>

      <hr/>
      <h1>{ num }</h1>
      <div>计时器</div>

      <hr/>
      <button onClick={handler}>触发一个逻辑比较复杂的事件</button>
      <hr/>

      <div ref={box}>测试ref操作</div>
      <button onClick={()=>box.current.style.color='red'}>改变颜色</button>
      <hr/>

      <input type="text" value={name} onChange={e=>setName(e.target.value)}/>
      <h1>你的姓名是：{name}</h1>
      <hr/>

      <Button type="primary">点击</Button>

      <br/><br/><br/>

    </div>
  )
}
