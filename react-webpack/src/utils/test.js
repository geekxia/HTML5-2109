/* eslint-disable */
function desc(C) {
  return C
}

// 装饰器语法（eslint检测装饰器报错）
// @desc
class Dog {
  run() {
    console.log('dog run')
  }
}
export default Dog
/* eslint-enable */
