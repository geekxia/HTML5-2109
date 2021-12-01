import React, { useEffect } from 'react'
import { observer, inject } from 'mobx-react'

export default inject(['music'])(
  observer(
    ({music}) => {
      useEffect(()=>{
        const params = {}
        music.getList(params)
        return ()=>{}
      }, [])

      const renderList = () => (
        music.list.map((ele,idx)=>(
          <div key={ele.n}>
            <span>{idx+1} - {ele.k}</span>
          </div>
        ))
      )

      return (
        <div>
          <h1>音乐列表</h1>
          { renderList() }
        </div>
      )
    }
  )
)
