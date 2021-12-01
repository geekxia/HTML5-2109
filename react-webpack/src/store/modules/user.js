import {
  makeAutoObservable,
  // makeObservable,
  // observable,
  // action
} from 'mobx'

// 【observable】 表示可被组件共享的变量（可被观察的响应式变量）
// 【action】 表示“用于修改state或者用于调接口”的函数

// 【这是mobx v6的写法】
// mobx v6 要配合 mobx-react v7 一起使用
export default class UserStore {
  constructor() {
    makeAutoObservable(this)
    // makeObservable(this, {
    //   msg: observable,
    //   changeMsg: action,
    // })
  }
  msg = 'hello mobx'
  abc = 123
  changeMsg (payload) {
    this.msg = payload
  }
}

// 【这是mobx v5的写法】
// mobx v5 要配置 mobx-react v6 一起使用
// export default class UserStore {
//   @observable
//   msg = 'hello mobx'
//   @action
//   changeMsg (payload) {
//     this.msg = payload
//   }
// }
