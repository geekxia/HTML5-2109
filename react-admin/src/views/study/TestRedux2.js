import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { changeCount, getArticleList } from '@/store/actions'

// 非常重要的开发原则：一切外部数据都必须从props进来。

export default () => {
  const count = useSelector(store=>store.study.count)
  const list = useSelector(store=>store.study.list)
  const dispatch = useDispatch()

  // 注意：dispatch(a) 这个a必须是{type,payload},这个信号被称作是'plain objects'。

  useEffect(()=>{
    // dispatch(getArticleList({page:1,limit:5}))
    return
  }, [])

  return (
    <div>
      <h1>在函数式组件中使用redux</h1>
      <h1>{count}</h1>
      <button onClick={()=>dispatch(changeCount(30))}>自增</button>
      <button onClick={()=>dispatch(changeCount(-20))}>自减</button>
      <hr/>

      {
        list.map(ele=>(
          <div key={ele.id}>{ele.title}</div>
        ))
      }

    </div>
  )
}
