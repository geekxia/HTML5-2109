px  绝对单位（工业标准）
em  相对单位，相对于最近的一个父级元素的font-size
rem 相对单位，相对于html的font-size

原理：设计移动H5页面时，不用考虑移动设备的高度，只考虑移动设备的宽度。我们写css尺寸样式时，是基于设备宽度的（不考虑高度）。怎么实现呢？我们通常使用rem布局（相对于根字体来写css尺寸单位）。我们的做法是把html.fontSize设置成当前移动设备宽度的1/10，以后在写样式尺寸时统一使用rem做单位（不要使用px这种绝对单位）。

举例 ip  375px  html.fontsize=37.5px （当前设备宽度的1/10）  
div   width=10rem  height=5rem  满屏

ip  414px   html.fontsize=41.4px
div  width=10rem  height=5rem

结论：以后我们在750px的UI稿上量取尺寸x，直接除以75就是我们想要的rem单位了。在vscode中安装一个px转rem的插件，并且把插件的转换基础比较设置成75。


# 使用UI搭积木

-> 根据UI稿，判断组件库中是否有现成可用的组件 -> 去Vue社区找 -> 自已写。


# 鉴权方案

http 短连接、无状态的

cookie & session
token
