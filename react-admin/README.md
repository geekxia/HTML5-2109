# 环境搭建

- 如何创建新项目？
```
cnpm i create-react-app -g
create-react-app react-admin
cd react-admin
```

- 如何把create-react-app创建的新项目“暴露”出来？
```
git init
git add --all
git commit -m 'first commit'
npm run eject
```

- create-react-app怎么做环境的二次封装？
  - 改端口
  - 跨域代理
  - 加 @ 指向'src'的绝对路径
  - 支持 sass / less 等
  - 支持 typescript

# Redux

- 简介：Redux是react技术栈中最经典的一个状态管理工具，是在Flux（数据流思想）指导下完成的。
- 场景：一般在中大型的项目中习惯用Redux；在阿里系的react脚手架中背后都是Redux。
- 扩展：如果大家能够正确地使用redux，那么你的react应用程序中的数据流一定是“可预测的”。
