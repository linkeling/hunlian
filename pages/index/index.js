//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    tableList: [],
  },

  onLoad: function (options) {    
    this.getList();    //进入页面就要显示已经请求完了的数据，所以要把getlist（）放在onLoad里面 
  },

  getList() {
      console.log(555555555555);
      var that = this;
      wx.request({      
      url: "http://localhost:8082/v1/match-admin/custom-base-info?pageIndex=1&pageSize=10",   //字符串拼接传递参数，当is_online=navi,也即是 is_online等于0请求未发布的数据，等于1请求招聘中的数据    
      header: {'content-type': 'application/json'},      
      method: 'GET',
      success:function(res){
          console.log(res.data.data);
          let tableList=res.data.data.dataList;
          that.setData({
            tableList: tableList,
          });
          console.log(tableList);
        }
      })  
      },
})