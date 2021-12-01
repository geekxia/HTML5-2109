// 演示create-react-app的二次封装

const path = require('path')

module.exports = {
  devServer: {
    port: 9090,
    // 备注：官方脚手架还可以src/setupProxy.js或者package.json中做代理。
    proxy: {
      // '/api': {
      //   target: 'https://cnodejs.org',
      //   changeOrigin: true
      // },
      '/apix': {
        target: 'http://10.36.132.232:9999',
        changeOrigin: true
      }
    }
  },
  alias: {
    '@': path.resolve(__dirname, 'src')
  }
}
