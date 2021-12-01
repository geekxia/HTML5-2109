// typescript
// 简介：TS是javascript的超集，来自于微软开源的，Vue3.0是由TS编写的。
// 关系：Flow是javascript的超集，来自于Facebook，Vue2.0、React都是Flow编写的。
// 框架：Angular也是类似的MVVM框架，默认就使用TS作为编程语言，所以Angular中有很多面向对象的语法。

import find from "src/pages/find/find"
import { setBackgroundTextStyle } from "_@tarojs_taro@3.3.12@@tarojs/taro"
import { useReducer } from "_@types_react@17.0.34@@types/react"

// 特点：node环境默认是不支持TS的，node环境默认也是无法检测TS语法错误的，所以当我们前端项目中使用TS时，不会发生运行时错误。

// 开发：凡是TS项目，都建议使用vscode这款天然能够提示TS错误的软件编辑器。

// 学习：学习TS中强大的类型支持，学习TS的面向对象编程。

// 资源：`https://www.tslang.cn/docs/home.html`


// 两种声明文件：一种是package.json中的 @types/* 这种包，或者代码目录中 *.d.ts 这种文件。声明文件的作用是为了解决TS环境中无法运行那些非TS的第三方库。

// TS配置文件：一种叫 jsconfig.json，另一种叫 tsconfig.json。这种TS配置文件用于指定TS编译环境等选项。

const isBol: Boolean = true
let age: Number = 20
age = 30
age = 40
console.log(isBol)

let octalLiteral: number = 0o744
// TS环境有些变量不能用，比如name这样的关键字，你换个名字即可。
{
    let name: string = `Gene`
    console.log(name)
}

const arr1: number[] = [1,2,3,4]
const arr2: object[] = [{id:1},{},{}]
const arr3: Array<number> = [1,4,300]
const arr4: Array<any> = [1,'hello',{},true, []]

const arr5: Array<any[]> = [[1,1,1], [2,2,2], ['a','b', true]]

// 元组：本质上也是数组，只不过数组中每个元素的数据类型是预先确定的。
const tup: [boolean, number, object, string] = [true, 100, {}, 'zhangsan']
tup[0] = false
tup[3] = 'world'

// 枚举：定义一套数量有限的“中英键值对”
enum Gender  {
    'man' = '男',
    'femal' =  '女'
}
console.log(Gender.man)

enum Color {
    red,
    green,
    blue
}
console.log(Color.red)
console.log(Color[0])

// any一般用于表示当前变量的类型是未知的。
// any表示“任何类型”
let abc: any = 100
abc = 'hello'
abc = [1,2,3]

// void一般用于函数的返回值，表示函数没有返回值。
// void表示“没有类型”
function add(a: number, b:number): void {
    console.log(a+b)
}
add(1,2)

let a1: null = null
let a2: undefined = undefined

// never 一般用于约束函数的返回值类型，表示当前函数没有结束
function error(message: string): never {
    // do something
    throw new Error(message)
}

// object 表示“非基本类型”
let a3: object = [1,2,3,4]
let a4: object = {a:1,b:2}

// 类型推断：定义变量时没有指定明确的类型，在用的时候我们使用“类型推断”。
// 语法：在使用变量时，变量名前面有<type>或者as语法，都是“类型推断”
let a5:any = 100
console.log((<string>a5).length)
console.log((a5 as string).length)

// 接口，你可以理解一种数据“形状”
// 强调：接口和类型是不一样的，“接口”可以参与面向对象编程，但“类型”不能。
// 注意：interface定义的形状，不能参与“类型联合”和“类型交叉”

// 面向对象一般语法：class Dog extends DogBase implements Animale1, Animale2 {}

// 用interface定义的形状叫“接口”，接口可以参与面向对象编程
interface People {
    readonly name: string,  // 只读属性，一旦赋值，就不能改了
    age?: number,           // 可选属性
    header?: boolean,
    run: (arg:any)=>any,    // 函数类型
    [propName:string]: any  // 自定义类型
}

const zhangsan: People = {
    name: 'zhangsan',
    run: (arg:any):any => {return},
    addr: '广东深圳',
    gender: 0
}
// zhangsan.name = 'lisi'


// 类型：你也可以理解成是一种数据“形状”
// 强调：“类型”不能参与面向对象编程，但可以参与“类型交叉”和“类型联合”
// 语法：用 type 关键字来自定义类型

type Good = {
    name: string,
    desc: string,
    price: number,
    img?: string,
    child: Array<object>,
    [propName:string]: any
}

const g1: Good = {
    name: '小米手机',
    desc: '好看的手机',
    price: 78,
    child: [{id:1,size:'2G'}],
    cate: 'office'
}

// 演示“类型”和“接口”在React的TS环境的一般应用
type Cate = {
    id: number,
    cate: string,
    cate_zh: string
}

interface CateSelectProps {
    list: Array<Cate>,
    value?: string,
    onChange?: (e:string)=>void
}

// 伪代码演示
// const CateSelect = (props: CateSelectProps) => (
//     <div>自定义品类下拉框</div>
// )

// <CateSelect 
//     list={[{id:1,cate:'office',cate_zh:'办公用品'}]} 
//     value={'office'} 
//     onchange={(e)=>setBackgroundTextStyle(e)} 
// />


// 类型联合
type A = number | string | boolean
const aa: A = true


type B1 = {
    name: string
}
type B2 = {
    age: number
}
// 类型交叉
type B = B1 & B2
const bb: B = {
    name: '张三',
    age: 90
}

// 类型联合
type C = B1 | B2 | B | number | string
const cc: C = {
    age: 100,
    name: '李四'
}
const cc2: C = 'hello'


// 泛类：定义函数时某种类型不确定，使用“泛型”占位。当函数被真正调用时才知道这个“占位”是什么类型。
function foo<T>(arg: T): void {
    // do something
}
foo<number>(100)
foo<Array<boolean>>([true,false,true])
foo<C>(cc)

// 使用泛型定义函数
function bar<T,U>(tup: [T, U]): [U, T] {
    // do something
    return [tup[1], tup[0]]
}
// 函数调用
bar<string,number>(['hello',100])  // [100,'hello']


// 总结：在React中，对props进行TS校验时，一般用“interface接口”，不建议用“type类型”
// 扩展：泛型比较难理解，但一定要看得懂、会用。