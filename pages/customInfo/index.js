var app = getApp();
var rts = require("../../utils/rts.js");

Page({
  data: {
     id:'',
     customBaseInfo:[],
  },


  onLoad: function (options) {
    var id = options.id;  //将数据格式转换回原来的格式
    this.setData({
      id: id    
    })
    this.geyCustomInfoById();
  },
  onReady: function () {

  },
  onShow: function () {
    var that = this;
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];
    if(that.data.params === 'hobby'){
      that.setData({
        hobbys: currPage.data.hobbyTags.length > 3?currPage.data.hobbyTags.slice(0,3):currPage.data.hobbyTags,
        hobbyTags: currPage.data.hobbyTags,
      })
    }
  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭
  },

   // 提交个人信息
   geyCustomInfoById: function (e) {
      var that = this;
      var id=that.data.id;

      rts.rtGet(app.globalData.apiUrl+"/v1/match-admin/custom-base-info/"+id, function (res) {
        console.log(res.data);
        that.setData({
          customBaseInfo:res.data,
        });
      })
  },
})