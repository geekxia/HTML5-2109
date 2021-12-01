// 这是微信小程序的配置文件，配置pages路由，配置底部Tabbar。。。。。

export default {
  // pages是用于配置页面路由的
  // 特点：小程序界面永远默认显示数组中的第一个页面
  pages: [
    'pages/find/find',
    'pages/activity/activity',
    'pages/shop/shop',
    'pages/index/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '千锋珠宝小程序',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#000000',
    selectedColor: '#ff0000',
    backgroundColor: '#ffffff',
    borderStyle: 'black',
    list: [
      {
        pagePath: 'pages/activity/activity',
        text: '展会活动',
        iconPath: 'assets/tabbar/t1.png',
        selectedIconPath: 'assets/tabbar/t1-on.png'
      },
      {
        pagePath: 'pages/find/find',
        text: '发现宝贝',
        iconPath: 'assets/tabbar/t2.png',
        selectedIconPath: 'assets/tabbar/t2-on.png'
      },
      {
        pagePath: 'pages/shop/shop',
        text: '明星店铺',
        iconPath: 'assets/tabbar/t3.png',
        selectedIconPath: 'assets/tabbar/t3-on.png'
      }
    ]
  },
  permission: {
    "scope.userLocation": {
      desc: "为了更好的用户体验，我们虔诚地希望使用你的地理位置"
    }
  }
}
