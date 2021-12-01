import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { onMounted, provide, ref } from 'vue'

// const { route, router, store, msg, num } = useStore()
export default function useInit() {
  console.log('setup')

  const num = ref(400)
  const msg = ref('')

  const route = useRoute()
  const router = useRouter()
  console.log('route', route)
  console.log('router', router)

  const store = useStore()
  console.log('store', store)

  onMounted(()=>{
    console.log('find setup mounted')
  })

  provide('hello', 'Hello Child')
  return { route, router, store, msg, num }
}
