import { getCurrentInstance } from 'vue'

// const app = useApp()
export default function useApp() {
  const app = getCurrentInstance()
  return app.appContext.config.globalProperties
}
