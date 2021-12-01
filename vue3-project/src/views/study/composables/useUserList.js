import { reactive } from 'vue'

export default function useUserList() {
  const list = reactive([
    { id: 1, name: 'lisi' },
    { id: 2, name: 'zhangsan' },
    { id: 3, name: 'wangwu' },
    { id: 4, name: 'zhaoliu' }
  ])
  const addUser = (user) => {
    list.push(user)
  }
  return [list, addUser]
}
