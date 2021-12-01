
// vue.config.js是@vue/cli默认的配置文件
// 简介：这个配置文件是基于webpack，也就是@vue/cli背后是有webpack的。
// 作用：为开发环境(npm run serve)添加一些配置；为项目打包(npm run build)提供若干配置。
// 理解：因为vue.config.js是基于webpack，所以代码语法都是node代码。
// 特点：每次修改了这个配置文件，必须重启项目才能生效。

// module.exports = function(){ return {} }
module.exports = {

  devServer: {
    // 解决vue开发环境下跨域的问题
    proxy: {
      // 配置一个请求路径，进行代理转发
      '/soso': {
        // 远程服务器：是那个真正给你数据的服务器的地址
        target: 'https://c.y.qq.com',
        changeOrigin: true
      }
    }
  }
}
