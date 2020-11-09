//index.js
//获取应用实例
const app = getApp()
var rts = require("../../utils/rts.js");

Page({
  data: {
    tabData: []
  },
  getUserInfo: function(e) {
    const that = this;
    //初始化用户登录信息，并容错尝试
    rts.initLogin(app.globalData,function (res) {
      console.log(res);
      //同步更新本地登录状态数据，并缓存
      // wx.switchTab({
      //   url: '../home/index',
      // })
    });
  }
})