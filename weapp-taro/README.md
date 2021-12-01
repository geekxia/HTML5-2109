小程序：核心理念是解决用户安装大量原生App但又不常用的问题，“小而美，用完即走”。
小程序也是APP，要依托在原生App（微信、头条、支付宝）中才能运行。

微信小程序
支付宝小程序
。。
。。

---------------------------------

原生App开发技术：
	- Android   Java     （谷歌）
	- IOS          Ojbectc-C   （苹果）

跨平台APP开发技术：
	uniapp 、 taro：  小程序、安卓app、IOS app。
	flutter：   只能安卓app、IOS app。
	ReactNative：安卓app、IOS app。
	mpvue、wepy：只能做微信小程序。

一些比较旧的APP技术：Codova、PhoneGap、Ionic。。。。。

混合开发（Hybrid开发）：在App中嵌入H5网页的一种实践技术。
	- 外层App只是一个壳子，里面内容都是H5。
	- App的主要功能都是原生技术，只有部分页面是H5。

微信小程序的开发技术：
	原生开发（不建议用原生写小程序，太麻烦了）
	wepy（微信官方出品的小程序框架，类vue，不好用）
	mpvue（社区里个人的小程序框架，类vue，已经不维护了）
	uniapp（Dcloud公司出品，可以做小程序，但是一般uniapp常用于做安卓App，类vue）
	Taro（京东凹凸实验室出品，可以做RN app，但是一般Taro常用于做小程序）

-----------------------------------

公众号H5网页，和普通H5网页， 有什么区别？前者依托于微信，可以使用手机原生功能。

微信小程序怎么学？

- 微信开发者工具
- 微信小程序管理后台
- 微信小程序官方文档


# 环境搭建
```
cnpm i @tarojs/cli -g
taro init weapp-taro
选择技术栈。。。
cd weapp-taro
cnpm install
npm run dev:weapp 启动微信小程序
```
- 在Taro项目根目录找到project.config.json配置微信小程序appid
- 在微信开发者工具中调用Taro的微信小程序


# 小程序开发中的若干个功能

- 小程序登录流程：Taro.login()获取临时code，再使用Taro.request()把code发送给后端，后端使用appid、appsecret、code向微信官方服务器调接口（获取到openid），后端进一步存储openid等用户信息。接着，后端自定义生成token返回给前端，前端把token存储起来。

- 小程序地理定位的交互开流程：
	- 在onLaunch中，首先使用Taro.getSetting()判断用户是否已经授权过地理位置。
	- 如果 No，进一步使用Taro.authorize()默认弹出授权请求框（在app.json需要配置permission）
	- 如果用户同意了，一切都顺利。
	- 如果用户拒绝了，在后面需要用到地理位置的业务页面中，从交互的角度进行设计，请求用户打开微信内置授权页面（Taro.openSetting）。

- 在小程序实现地图及导航功能
	- 在当前页面中，使用Tara.getLocation()获取用户当前的经纬度。
	- 如果获取失败（表示用户已经拒绝了位置授权），要使用Taro.openSetting()打开微信内置授权页面。
	- 如果获取成功，我们可以使用Map组件显示以当前经纬度为中心的地图（一般地图仅用于简单的显示作用）。
	- 如果还需要进行复杂的地图功能（比如导航），我们建议使用Taro.openLocation()打开微信内置地图，再进一步引导用户打开地图软件。

- Button表单的一些开放能力
	- 如何获取用户信息（头像、昵称）？现在使用button[open-type='getUserInfo']已经不能实现了，建议使用Taro.getUserInfo()来获取各种加密信息，再发送给后端进行解密（appid,appsecret）。
	- 如何获取用户手机号码？只有已经认证了的大陆企业小程序用户才能使用，用button[open-type='getPhoneNumber']。
	- 使用button[open-type='share']可以实现“分享”功能，分享给微信好友。

- 几个与生命周期/钩子的功能
	- 下拉刷新要在当前页面的配置文件中添加enablePullDownRefresh=true，当用户下拉时会触发usePullDownRefresh(fn)。
	- 触底加载功能默认就是开启的，当页面触底时会触发useReachBottom(fn)这个函数。
	- 当用户点击胶囊按钮上的三个点，或者点击button[open-type='share']时，会触发分享功能，也会触发useShareAppMessage(fn)这个函数。
	- useDidShow(fn)  当页面显示出来时触发。
	- useReady(fn) 当页面完成渲染时。
