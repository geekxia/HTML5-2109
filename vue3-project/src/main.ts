import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'

// 按需引入ant-design-vue
import { Button } from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

// vue根实例
const app = createApp(App)
// 在根实例对象放置全局数据，类似vue2中的prototype的功能
app.config.globalProperties.$img = 'http://3fengs.com'
// 自定义指令
app.directive('color', (el,binding)=>{
  el.style.color = binding.value
})

app.use(Button)

app.use(router)
app.use(store)
app.mount('#app')
