import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "umi"

const a: any = 'hello'
console.log('a', a)

const GoodList: React.FC = () => {
  const msg = useSelector(model=>model.user.msg)
  const dispatch = useDispatch()
  const changeMsg = () => {
    dispatch({type:'user/updateMsg', paylaod: 'hello 2109'})
  }

  useEffect(()=>{
    dispatch({type:'user/getMsg', paylaod: ''})
  }, [])

  return (
    <div>
      <h1>商品列表</h1>
      <h1>{msg}</h1>
      <button onClick={changeMsg}>修改MSG</button>
    </div>
  )
}

export default GoodList
