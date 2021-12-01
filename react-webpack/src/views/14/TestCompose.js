import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

// 组合：是组件化的一种思想，也是一种设计模式（软件开发经验）。
// 作用：组件封装（组件复用）
// 实现：使用继承来实现 vs 使用组合来实现。

// 用组合实现组件化的语法基础：[render props]、[props children]
  // [render props]，在“自定义组件”上可以使用props向子组件传递jsx元素，进一步参与子组件的渲染。
  // [props children]，在“自定义组件”的内部嵌套其它的jsx，进一步在子组件中使用props.children来接收。

// 【使用继承实现组件化，大约思路如下】
// class Model extends PureComponent {}
// class ModelWithClose extends Model {}
// class ModelWithFooter extends Model {}
// class ModelWithCloseMini extends ModelWithClose {}
// ……

// 【使用组件实现组件化，大约思路如下】
// class ModelHeader extends PureComponent {}  // 得到2种头部
// class ModelFooter extends PureComponent {}  // 得到3种底部
// class ModelBody extends PureComponent {}    // 得到1种主体
// ……通过以上三类组件，我们可以得到6种不同的弹框组件


// 【举例，封装Model】

const Header = ({onClose,tip}) => (
  <div className='header'>
    <span className='tip'>{tip||'提示'}</span>
    <span className='close' onClick={()=>onClose()}>X</span>
  </div>
)

const Footer = ({type, onClose, onOk}) => {
  let btns = []
  const Cancel = <span className='cancel' key='1' onClick={onClose}>取消</span>
  const Confirm = <span className='confirm' key='2' onClick={onOk}>确定</span>
  const Delete = <span className='delete' key='3' onClick={onOk}>删除</span>
  switch (type) {
    case 'delete':
      btns = [Delete, Cancel]
      break
    default:
      btns = [Confirm, Cancel]
  }
  return (
    <div className='footer'>
      { btns }
    </div>
  )
}

const Body = ({children}) => (<div className='body'>{children}</div>)

// Modal组件
const Modal = props => {
  const {
    children,
    type,
    show,
    onClose,
    tip,
    onOk
  } = props
  return (
    show && <div className='qf-layer' >
      <div className='model'>
        <Header onClose={onClose} tip={tip} />
        <Body>{children}</Body>
        <Footer type={type} onClose={onClose} onOk={onOk} />
      </div>
    </div>
  )
}
// 使用prop-types这个第三方包来实现组件props验证
Modal.propTypes = {
  show: PropTypes.bool,
  type: PropTypes.oneOf(['delete','confirm']),
  onClose: PropTypes.func,
  tip: PropTypes.node.isRequired,  // 思考：ReactNode 和 ReactElement有什么区别？
  onOk: PropTypes.func
}

export default class extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      show1: false
    }
  }
  render () {
    const { show1 } = this.state
    return (
      <div>
        <h1>学习组合</h1>
        <button onClick={()=>this.setState({show1:true})}>修改用户名</button>
        <hr/>
          <Modal
            type={'confirm'}
            show={show1}
            onClose={()=>this.setState({show1: false})}
            tip={<div>修改用户</div>}
            onOk={()=>console.log('提交接口')}
          >
            用户名：<input type="text"/>
          </Modal>
        <hr/>
      </div>
    )
  }
}
