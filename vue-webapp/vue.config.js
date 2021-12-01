module.exports = {
  // 这个本地代理是为了解决开发环境下的跨域问题
  // 这个生产环境是没用。在生产环境解决跨域要使用nginx。
  devServer: {
    port: 8001,
    open: true,
    proxy: {
      '/api': {
        target: 'http://10.36.132.232:9999',
        changeOrigin: true
      }
    }
  }
}
