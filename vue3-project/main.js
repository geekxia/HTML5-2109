// 这里是CommonJS代码（不要使用ES6代码）
// 因为这个入口是运行Node环境中

// 这个入口文件是Electron桌面应用的

const { app, BrowserWindow } = require('electron')
const path = require('path')
// 用于判断是开发环境，还是生产环境
const isDev = require('electron-is-dev')

// 创建视窗
function createWindow () {

  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  // 如果开发环境，mainWindow打开并访问本地端口
  // 如果是生产环境，mainWindow打开一个静态资源文件
  if(isDev) {
    mainWindow.loadURL('http://localhost:3000')
    // 允许用户打开类似谷歌浏览器的控制台
    mainWindow.webContents.openDevTools()
  }else{
    mainWindow.loadFile(path.join(__dirname, 'dist/index.html'))
  }
}


app.whenReady().then(() => {
  // 创建容器
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
