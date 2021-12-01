import Dashboard from '@/dashboard'
import { Provider } from 'react-redux'
import store from '@/store'
import { HashRouter } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'

// 根组件
function App() {
  return (
    <HashRouter>
      <Provider store={store}>
        <ConfigProvider locale={zhCN}>
          <Dashboard />
        </ConfigProvider>
      </Provider>
    </HashRouter>
  )
}

export default App
