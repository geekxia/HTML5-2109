// 在这个文件中，放置开发环境和生产环境都需要的webpack配置
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
  // 入口
  // entry: './src/main.js',
  // entry: path.resolve(__dirname, 'src/main.js'),
  entry: {
    vendor: ['react', 'react-dom'],
    // 理解：相当于给入口文件取一个名字，叫app
    app: {
      import: path.resolve(__dirname, '../src/main.js'),
      dependOn: 'vendor'
    }
  },
  // 出口
  output: {
    // [name]，这个特殊的字符串表示entry中指定的文件名
    // [chunkhash]，这个特殊的字符串表示根据chunkhash规则来生成hash值
    // 什么是chunk？对src代码进行打包，打包结果默认是一个app.js，如果app.js太大，我们希望把它分割成多个小的chunk（一般我们使用路由懒加载对代码进行分割，分割的结果就是chunk）
    // chunkhash有什么特点？
    filename: 'js/[name].[chunkhash].js',
    path: path.resolve(__dirname, '../dist'),
    // 每次运行或打包项目时，先删除dist中的旧代码
    // 在v4中，使用clean-webpack-plugin来实现
    clean: true
  },
  // 如何让webpack打包？loaders、plugins
  // webpack实际上都是class类
  plugins: [
    // 作用：用于把src中的js代码自动插入到指定的html文件
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      title: '快乐'
    }),
    // 开启编译进度条（这是一个webpack的内置插件）
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[chunkhash].css'
    })
  ],

  // 为什么叫module、而不是loaders？
  // 理解：在webpack眼中，一切皆module，一切皆模块
  // loaders是webpack核心
  module: {
    // 如何理解rules？规则，用于定义解析、编译文件模块的规则
    rules: [
      // 第二条loaders规则：用于定义处理css/sass的模块解析规则
      // 人话：当项目运行或打包时，如果发现文件模块是以.css/.scss结尾的，我们使用sass-loader加载.scss文件、并交给sass编译器。编译的结果的是.css文件，再由css-loader进行加载并返回css代码，style-loader加载css代码，把css注入到DOM树中。
      // 特别注意：处理某种模块时，如果需要多个loader共同工作，有严格的顺序要求——先工作的loader放在后面。

      // 坑：关于sass-loader的坑。在v5中可以使用最新版本的sass-loader，在v4中只能使用低版本的sass-loader（回忆vue脚手架集成sass的坑）
      { test: /\.(scss|css)$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader' ]},
      // v5中使用图片模块的规则
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      }
    ]
  },
  // webpack解析的配置
  resolve: {
    // 配置路径别名
    alias: {
      '@': path.resolve(__dirname, '../src')
    },
    // 配置省略后缀
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.vue']
  }
}
