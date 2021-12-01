# 环境搭建
```
yarn create vite vue3-project --template vue
cd vue3-project
cnpm install
```

## 一、组件定义

- .vue 编写传统vue2.0式的单文件
```
export default {
  data() {
    return{
      count: 100
    }
  }
}
```
- .vue 使用defineComponent定义单文件
```
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    const num = ref(200)
    return {
      num
    }
  },
  data() {
    return{
      count: 100
    }
  }
})
```
- .vue，不使用defineComponent()定义setup文件
```
import { ref } from 'vue'
export default {
  setup() {
    const num = ref(300)
    return {
      num
    }
  }
}
```
- .js/.ts 使用 h 函数定义组件
```
import { ref, h } from 'vue'
export default {
  setup() {
    const num = ref(400)
    return ()=>h('h1', {}, [
      h('div', {}, '第一行文字'),
      h('div', {}, '第二行文字')
    ])
  }
}
```
- .jsx/.tsx 使用JSX语法定义组件（推荐的写法）
```
import { ref } from 'vue'
export default {
  setup(props) {
    console.log('setup props', props)
    const num = ref(400)
    return () => (
      <div>
        <h1>Hello JSX</h1>
        <h1>{num.value}</h1>
      </div>
    )
  }
}
```
- 还有其它什么写法？自已总结。

## setup组合特性

- vue3.0为什么新增了setup组合特性？（为了解决vue2.0中“数据和业务不分离”的缺陷）

- vue3.0怎么解决“业务和数据不分离”的问题？
  第1步：使用setup函数以及组合API，把传统的组件选项（data、methods、watch、computed）替换掉。
  第2步：进一步封装Hooks，把setup中的多个逻辑点分别封装起来，这就实现了逻辑的分离。

- ref 用于定义响应式变量、快捷DOM访问。
  - 基本语法：const a = ref(1) // {value:1}
  - 基础使用： 一般用于定义 String、Number、Boolean 这种基于数据类型，外在表现统一使用 .value 访问。
  - 补充：ref 还可以访问 DOM对象或者组件实例对象，可做DOM操作。
- toRef、toRefs 把一个object的变量，变成响应式的变量。
  - 基本语法：const msg = toRef(obj, key) // 把obj[key]变成响应式的
  - 基本语法：const { msg } = toRefs(obj) // 把整个obj都变成响应式的
- unref 返回一个变量的值
  - 基本语法：const x = ref(x)  // 如果x是ref变量则返回x.value，如果x不是ref变量则直接返回x。
- isRef 用于判断一个变量是不是ref响应式变量
  - 基本语法：const bol = isRef(x)
- shallowRef 用于性能优化，只对对象的第一层进行proxy
  - 基本语法：const obj = shallowRef({a:1,b:{c:{d:{e:2}}}})
- triggerRef 用于手动触发那些shallowRef的变量进行更新视图
  - 基本语法：triggerRef(obj)  // 当obj.value.b.c.d发生变化，triggerRef(obj) 强制更新视图。
- customRef 自定义ref，把ref变量拆成get/set的写法
  - 基本语法：参考api文档。

- reactive 用于定义响应式变量（引用数据类型）
  - 基本语法：const arr = reactive([])  // {value: []}
  - ref和reactive是什么关系呢？ref背后是使用reactive来实现的。
- readonly 把响应式变量变成“只读的”，如果修改就报警告。
  - 基本语法：const user = readonly({name:1,age:2})
- isProxy 用于判断一个变量是否是响应式的，返回布尔值
  - 基本语法：const bol = isProxy(x)
- isReactive 用于判断一个变量是否是reactive响应式变量，返回布尔值
  - 基本语法：const bol = isReactive(x)
- isReadonly 用于判断一个变量是否是readonly的，返回布尔值
  - 基本语法：const bol = isReadonly(x)
- toRaw 用于返回一个响应式变量的原始值
  - 基本语法：const a3 = toRow(reactive(a1))  // a1===a3是true
- markRaw 用于把一个普通变量标记成“不可proxy”的
  - 基本语法：const b2 = markRaw(b1)  // b2是无法被reactive的
- shallowReactive 用于性能优化，只对对象的第一层进行proxy
  - 基本语法：const c = shallowReactive({a:{b:{c:100}}})  // 只对这个对象的第一层进行proxy
- computed 用于对响应式变量进行二次计算，当它依赖的响应式变量发生变化时会重新计算
  - 基本语法：const c = computed(()=>c1.value*c2.value)  // 只读
  - 基本语法：const c = computed({get:()=>c1.value*c2.value,set:(newVal)=>c1.value=newVal}) // 可写可读
- watch 用于监听响应式变量的变化，组件初始化它不执行
  - 基本语法：const stop = watch(x, (new,old)=>{})   // 调用stop()可以停止监听
  - 基本语法：const stop = watch([x,y], ([newX,newY],[oldX,oldY])=>{})
- watchEffect 用于监听响应式变量的变化，组件初始化会执行
  - 基本语法：const stop = watchEffect(()=>ajax({cate,page,size}))

- vue3生命周期的变化
  - vue3中有两套生命周期钩子：一套是选项级别的(beforeUnmount)，一套是组合级别的(onBeforeUnmount)
  - 选项级别的生命周期有13个
  - 组合级别的生命周期有11个（少了创建阶段的那两个）
  - vue3对比vue2，多了两个 renderTracked() / renderTriggered()
  - 在有setup时，不建议使用选项级别的生命周期。

- provide/inject通信
  - 在父级组件中：provide('hello', 一个变量)
  - 在子级组件中：const hello = inject('hello')

- vue3中父子组件通信
  - 基础知识：setup(props,ctx) 因为setup比所有生命周期更早运行，所以不能访问this，只能通过ctx使用相关API。
  - 父组件向子组件传值，使用props接受自定义属性，在setup的第一个参数可以进行访问。
  - 子组件向父组件传值，使用emits接收自定义事件，在业务逻辑中使用 ctx.emit('change',newVal)

- vue3中app.config全局配置
  - 背景：在vue2中有Vue.prototype这种原型链功能，它有两个缺点：当原型链上的东西太多时影响Vue项目性能；当原型链上有未使用到的数据时，会影响Tree Shaking功能。
  - 解决办法：在vue3中隐藏了Vue.prototype原型链。
  - 问题：没有了原型链，那全局数据放哪里？
  - 解决办法：使用app.config.globalProperties放置全局数据，在组件中使用getCurrentInstance()来获取全局数据。

- useRoute / useRouter
- useStore

## 为什么vue3.0比vue2.0更快？（1.2-1.3倍）

- 使用更加高效的Proxy来实现响应式
- 创建虚拟DOM的方式发生了本质性的变化
  - 生成VM时，给每一个节点添加PatchFlag(-1、0, 1、2、3、4、5、9)，标记一个节点的动态类型
  - 生成VM时，对那些静态节点或者静态属性进行“静态提升”，避免对那些静态节点和属性执行二次vm生成。
  - 生成VM时，使用事件缓存，避免重新绑定事件
- 采用了更加高效的diff运算
  - 同级比较，不断递归，凡是遇到PatchFlag=-1/0不收集脏节点（直接忽略）
- vite
  - 环境依赖和代码依赖分开了。

## Vue3.0若干细节特性

- v-for 和 v-bind:ref 可以同时使用，在vue3做了相关的性能优化。
- defineAsyncComponent 用于定义异步组件，但不能用于路由懒加载。
- $attrs 可以访问父组件传递所有属性（包括class和style）。
- $children 在vue3.0被移除掉了。
- app.directive() 自定义指令，指令的钩子函数发生若干变化。
- 在vue3.0中，data只能是工厂函数，哪怕是根组件中也必须是工厂函数。
- 在vue3.0中，如果mixin和data中有相同的变量，data会覆盖掉mixin中的这个变量。
- 在vue3.0中，子组件中要使用 emits:[] 来接收父组件传递过来的自定义事件。
- 在vue3.0中，$on / $off / $once 这些API被移除了，只保留了 $emit。
- 过滤器，移除了。
- 新增了“片段”，在视图模板中可以同时存在多个根节点。
- vue3.0中“函数式组件”如何编写？
- 在vue3.0中没有了"Vue"这个构建函数，所以vue2.0中那些静态方法都没有，使用createApp()这个工厂函数创建vue实例，在vue实例上有一些新增方法：app.use() / app.mixin()。
- 因为Vue.nextTick()不支持TreeShaking，所以在vue3.0中移除了它，使用nextTick这个API来替代。
- 在vue3.0中，v-if/v-else/v-else-if作用于兄弟节点时，可以不用加key了，vue3.0会自动添加唯一的key。<transition>在对多个节点执行“显示隐藏”动画时，可以不用加key了。
- <transition>动画的六个钩子有两个变了：v-enter-from，v-leave-from。
- 在vue2.0中，可以使用 Vue.config.keyCodes 自定义键盘码，在vue3.0这个功能移除了。
- 在vue3.0中，$listeners 移除了。
- 在vue2.0中，可以使用 el选项或者$mount进行挂载，但vue3.0中只能通过$mount进行挂载。
- vue2.0中的 propsData 这个选项，移除了。
- 在vue2.0中，render选项(类型是函数)，它的第一个参数是 h（渲染函数），在vue3.0中要从vue导入 h 这渲染函数 `import { h } from 'vue'`。
- suspense，在React也有，解决异步组件的交互体验，初始化显示fallback插槽中的内容，等待异步组件加载成功。
- 事件修饰符 .native 移除了。
- 在vue2.0中同一个类表单上只能使用一个v-model,并且不能自定义修饰符。在vue3.0中，在同一个类表单上可以同时使用多个v-model，语法`<MyForm v-model:x='a' v-model:y.m1.m2='b'></MyForm>`，在MyForm子组件中使用props接收x和y，使用emits:['update:x','update:y']接收v-model过来的自定义事件。在vue3.0中，v-mode还支持自定义修饰符，在MyForm子组件中使用props来接收自定义修饰符。
- 在vue2.0中，同一元素上的v-for优先级比v-if高。在vue3.0中，同一元素上的v-if优先级比v-for更高。
- 在vue3.0中，同时绑定动态属性和静态属性时，与顺序有关。谁在后面谁起作用。
- 在vue3.0中，销毁阶段的两个生命周期变成了 beforeUnmount、unmounted。还新增两个生命周期 renderTracked、renderTriggered（只在开发环境下起作用）。
- watch选项的变化：支持对数据进行深度监听，要加deep:true；还支持监听一个对象中的后代属性。
```
watch: {
  list: {
    handler(newList,oldList){},
    deep: true
  },
  "obj.a.b.c.d" {
    console.log('d 变化了')
  }
}
```
- <teleport to='选择器'> 把嵌套的视图结构“传送”到选择器对应的节点中去。用它可以基于body定义的弹框，还可以向head标签插入动态样式。

## vite简介

- 为什么vite比webpack更快？
  - 本地服务环境和代码打包环境是分离的。
  - vite运行时不对代码模块进行打包，这利用了浏览器原本就支持import的特性，把编译工作都交给了浏览器。
  - vite运行时，只对当前需要用到的模块进行加载，交给浏览器进行编译等处理，那些未被访问的模块vite不管。
  - vite打包上线时，用的是rollup进行代码打包，对所有模块都要处理。

## cnode重构

- vuex走流程时,state数据发生了变化,在组件必须使用computed来访问vuex中的state数据才能自动更新视图。
- 在 vue3.0 中，使用 ant-design-vue 时要用 v2版本。

## Electron简介

- Electron专门用于做桌面应用，一套代码打包成window/mac/linux平台上的桌面应用。
- Eletron背后是基本谷歌内核和Node实现的，它是一个运行时环境，所以它可以访问操作系统。
- Eletron，进一步可以理解成是一个CSS+HTML+JS的宿主环境，所以在Electron环境可以使用vue、react、angular、jquery来做前端应用。
- 实战产品：vscode、atom。
- 市场中情况：大多数公司用Electron做桌面式的管理系统。
- 关于Node环境：Eletron本地开发需要提前安装Node，但打包成桌面应用就不需要Node环境了。


## 如何把一个前端应用变成桌面应用？

- 安装election
```
cnpm i electron -g
cnpm i electron -D
```
- 在package.json中添加"main":"main.js"
- 在项目根编写main.js文件（参考文件中的代码）
- 启动本地开发服务
```
npm start 先启动前端项目
electron .  再启动桌面应用
```
- 命令优化：使用 concurrently 这个第三包实现多个命令行并行运行
```
cnpm i concurrently -D
```
```
# 在package中如下配置并行命令
"scripts": {
  "dev": "vite",
  "start": "concurrently \"npm run dev\" \"electron .\""
}
```
- Electron项目打包，推荐使用 electron-builder 这个工具。
