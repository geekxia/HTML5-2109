import { readonly, reactive, isProxy } from 'vue'

export default function useUser() {
  const user = readonly(reactive({name:'list',age:30}))
  console.log('user', user)
  // setTimeout(()=>user.age=40, 2000)
  const x = 1
  const y = readonly({a:1,b:{c:3}})
  console.log('是否被proxy拦截过', isProxy(user), isProxy(x), isProxy(y.b))
  return user
}
