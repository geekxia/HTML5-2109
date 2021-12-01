
import { connect } from 'react-redux'
import { changeCount } from '@/store/actions'

export default connect(
  store => ({
    count: store.study.count
  }),
  dispatch => ({
    changeCount: payload => dispatch(changeCount(payload))
  })
)(
  ({count, changeCount}) => (
    <div>
      <h1>在函数式组件中使用redux</h1>
      <h1>{count}</h1>
      <button onClick={()=>changeCount(100)}>自增</button>
      <button onClick={()=>changeCount(-50)}>自减</button>
    </div>
  )
)
