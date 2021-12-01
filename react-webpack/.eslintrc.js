// eslint配置文件，官方有六种配置方式（有一种已经废弃的）
// rules规则：在三种级别 error=2  warn=1  off=0

// 如何修复eslint的错误？
// 1、找到eslint的配置文件，把规则的级别调整一下。
// 2、在src源码中使用eslint注释来临时关闭eslint检测。
// 3、在项目根目录中添加.eslintingore配置文件。
// 4、老老实实找到报错的文件，改好。（推荐）

// 如何在eslint的基础上添加额外的eslint插件？
// 在npm官网找eslint插件并安装。
// 在eslint配置文件中进行配置。

module.exports = {

  // 解决eslint无法检测“装饰器”“扩展运算符”等语法的问题
  parser: "@babel/eslint-parser",

  plugins: [
    "react",
    "react-hooks",
    "jsx-a11y",
    "babel"
  ],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended"
  ],
  // ESlint解析选项
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  // 在elsint的基础上自定义eslint检测规则
  rules: {
    "semi": 0,
    "no-undef": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/no-static-element-interactions": 0,
    "react/display-name": 0,
    "react/jsx-key": 0,
    "jsx-a11y/tabindex-no-positive": 0,
    "react/no-direct-mutation-state": 0,
    "react/prop-types": 0,
    "jsx-a11y/no-noninteractive-element-interactions": 0,
    "react/no-string-refs": 0,
    "jsx-a11y/no-onchange": 0,
    "jsx-a11y/aria-role": 0,
    "react-hooks/exhaustive-deps": 0
  }
}
