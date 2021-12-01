import { useStore } from 'vuex'

export function useSelector(fn) {
  const store = useStore()  
  return fn(store.state)
}

export function useDispatch() {
  const store = useStore()
  return store.dispatch
}
