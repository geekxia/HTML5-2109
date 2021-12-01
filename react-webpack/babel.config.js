// 语法：CommonJS语法

// 作用：用于配置babel编译器，常用配置选项有presets和plugins
module.exports = {
  // presets(预设)：用于配置js语法编译器
  // @babel/core 是babel编译器的核心代码（必须要有的）

  // @babel/preset-env 用于把大多数ES6代码转换成ES5代码；如果有少量ES6代码无法转换，要使用plugins来处理。
  // @babel/preset-react  用于把jsx语法转换成ES5代码
  // @babel/preset-typescript  用于把ts代码转换成ES5代码
  // @vue/cli-plugin-babel/preset  用于把vue组件转化成vue的js代码

  presets : [
    ['@babel/preset-env', {}],
    ['@babel/preset-react', {}]
  ],

  // plugins(插件)：用于弥补preset预设无法编译的小的特殊的语法
  plugins : [
    // 下面这两个插件，用于弥补@babel/preset-env的缺陷，用于把装饰器语法转化成ES5。
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ["@babel/plugin-proposal-class-properties", { "loose": true }],
    ["@babel/plugin-proposal-private-methods", { "loose": true }],
    ["@babel/plugin-proposal-private-property-in-object", { "loose": true }],
    ["@babel/plugin-syntax-dynamic-import"]
  ]
}
