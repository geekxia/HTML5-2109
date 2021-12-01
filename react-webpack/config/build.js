// 在这个文件中，只放置生产环境所需要的webpack配置
const path = require('path')

module.exports = {
  // 告诉webpack，这是生产环境（准备上线）
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: [
      // 第一条loaders规则：用于定义把src中的.js代码解析、编译成浏览器能够识别的ES5代码
      // 人话：当项目运行或打包时，如果发现文件模块是以.js结尾的，就使用babel-loader来加载它，并交给babel编译器（@babel/core、@babel/preset-env等）进行编译。编译的结果是浏览器能够识别的ES5代码。

      // 如何在webpack中优雅地集成babel编译器？
        // 第1步：添加一条loaders规则 [{test, use}]
        // 第2步：安装babel-loader（只是用于加载.js文件并交给babel编译器）
        // 第3步：安装当前环境所需要的所有babel编译器，@babel/core、@babel/preset-env、@babel/插件。。。
        // 第4步：在项目根目录添加babel.config.js配置文件，对预设和插件进行配置
      { test: /\.(js|jsx|ts|tsx)$/, use: ['babel-loader'] }
    ]
  },
  resolve: {
    alias: {
      'react': path.resolve(__dirname, '../node_modules/react/umd/react.production.min.js')
    }
  }
}
