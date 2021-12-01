import routes from '@/views'
import { Route, Switch, Redirect } from 'react-router-dom'
import hasAuthority from './permission'
import { useSelector } from 'react-redux'

const NotAuth = () => <div>你不配访问，请联系管理员申请权限</div>

export default () => {

  const { roles } = useSelector(store=>store.user.userinfo)

  // 渲染视图容器
  const renderRoute = ()=> {
    const result = []
    // 封装一个定义路由规则的递归方法
    const recursion = arr => {
      arr.map(ele=>{
        if (hasAuthority(ele.permission, roles)) {
          result.push(
            <Route key={ele.id} path={ele.path} component={ele.component} />
          )
        } else {
          result.push(
            <Route key={ele.id} path={ele.path} component={NotAuth} />
          )
        }
        // 自已调用自己，要给递归结束条件
        if(ele.children) recursion(ele.children)
      })
    }

    routes.map(ele=>{
      if(ele.children) recursion(ele.children)
    })
    return result
  }

  return (
    <div className='qf-main'>
      {/*Switch作用，加快路由匹配的时间*/}
      {/*Switch和Route之间不能有其它任何节点，也就是说Route的直接父节点必须是Switch*/}
      <Switch>
        { renderRoute() }
        <Redirect from='/*' to='/redux1' />
      </Switch>
    </div>
  )
}
