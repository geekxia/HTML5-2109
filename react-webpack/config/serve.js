// 在这个文件中，只放置开发环境所需要的webpack配置

const path = require('path')
const ESLintPlugin = require('eslint-webpack-plugin')

module.exports = {
  // 告诉webpack，这是生产环境（准备上线）
  mode: 'development',
  // 浏览控制台报错的位置和src源码位置保持一致
  devtool: 'inline-source-map',
  optimization: {
    minimize: false
  },
  // 用于开发环境（development）
  // 理解：webpack-dev-server实际上是expess服务器
  devServer: {
    port: 8080,
    // v5.58.1在这个版本中，无须再指定contentBase，默认就使用public作为静态资源目录
    // 在旧版本中，表示手动指定静态资源目录
    // contentBase: path.resolve(__dirname, 'public'),
    open: true,
    // 开启热更新功能
    // HMR = hot module replacement，它背后会开启一个websocket服务，每当本地代码发生变化时，ws服务会将其推送至浏览器、进行更新。
    hot: true,
    // 需求：当eslint报警告不产生覆盖层，当产生错误时才有覆盖层
    client: {
      overlay: {
        errors: true,
        warnings: false
      },
    },
    // 代理
    proxy: {
      '/splcloud': {
        target: 'https://c.y.qq.com',
        changeOrigin: true
      }
    }
  },
  // 配置开发环境所需要的loaders
  module: {
    rules: [
      { test: /\.(js|jsx|ts|tsx)$/, use: ['babel-loader'], exclude: /node_modules/ },

      // v4中配置eslint写法
      // 人话：当项目运行时，如果文件后缀以.js...结尾，使用eslint-loader进行加载，交给eslint插件来检测代码规范。
      // 注意：这个loader不要和babel-loader写在一起；这个loader应该比babel-loader先工作，先检测代码规范，只有当代码没有eslint问题，才进行下一步的babel编译。
      // enforce: 'pre' 指定eslint-loader是前置loader。
      // { test: /\.(js|jsx|ts|tsx)$/, use: ['eslint-loader'], enforce: 'pre', exclude: /node_modules/ }
    ]
  },
  plugins: [
    // eslint作用：约束代码的规范，这种规范往往不是约束语法。以便于团队协同开发。
    // eslint工作：当开发环境运行时，ESLintPlugin遇到.js就开始工作，使用eslint这种检测来检测代码规范。发生在babel工作之前。

    // v5中配置eslint写法
    new ESLintPlugin({
      exclude: ['node_modules']
    })
  ],
  resolve: {
    alias: {
      'react': path.resolve(__dirname, '../node_modules/react/umd/react.development.js')
    }
  }
}
