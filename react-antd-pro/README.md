```
cnpm i create-umi -g
create-umi react-antd-pro
cd react-antd-pro
cnpm i
npm start
```

- dva  个人作品（类似vue脚手架）
  - 理解：dva = react-router-dom + redux + redux-saga
  - 重点：redux-saga 状态管理的代码风格非常像vuex

- umi  企业级的react脚手架（基于配置的）
  - 特点：默认已经集成dva、antd、immer。。。
  - 缺点：如果你公司需要过多的定制产品，umi可能不太适合。

- ant-design-prp   企业级的中台产品
  - 特点：基于umi的，默认就集成了dva(redux、redux-saga、react-router-dom、immer、antd..)
  - 缺点：在这里开发，不要做过多定制。

