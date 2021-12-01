import React from 'react'
import routes from '@/views'
import { Route, Switch, Redirect } from 'react-router-dom'


export default () => {

  // 渲染视图容器
  const renderRoute = ()=> {
    const result = []
    routes.map(ele=>{
      if(ele.children) {
        ele.children.map(ele=>{
          result.push(
            <Route key={ele.id} path={ele.path} component={ele.component} />
          )
        })
      }
    })
    return result
  }

  return (
    <div>
      {/*Switch作用，加快路由匹配的时间*/}
      {/*Switch和Route之间不能有其它任何节点，也就是说Route的直接父节点必须是Switch*/}
      <Switch>
        { renderRoute() }
        <Redirect from='/*' to='/jsx' />
      </Switch>
    </div>
  )
}
