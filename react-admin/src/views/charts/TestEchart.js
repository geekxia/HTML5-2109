import * as echarts from 'echarts'
import { useEffect, useRef } from 'react'

import initOrderOpt from './options/orderOpt'

export default () => {
  const orderRef = useRef(null)


  useEffect(()=>{
    console.log('----', echarts)
    const c1 = echarts.init(orderRef.current)
    if(true) {
      const opt = initOrderOpt({})
      c1.setOption(opt)
    }
  }, [])

  return (
    <div className='qf-charts'>
      <h1>数据分析</h1>
      <div style={{width:'400px',height:'300px'}} id='main' ref={orderRef}></div>
    </div>
  )
}
