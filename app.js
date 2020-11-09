//app.js
App({
  //全局变量
  globalData: {
    apiUrl: "http://47.108.64.112:8083", 
    wxappId: "wxdf8ac6f53cd51e7d",                //小程序id
    userInfo: {
      sex:''
    },                                     //用户信息
    isServer:0,                                   //服务是否正常 0正常 1服务异常 2UAA异常
    session: null,                                //鉴权域key(一次获取，减少解密请求)
    imgCropperSrc:'',                              //头像裁剪
  },

  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
})