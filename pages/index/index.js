//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    scrollTop: 0,
    tableList: [],
    pageIndex:1,
    pageSize:10,
    hidden: true,  
    total:0,
  },
 
  onShow:function(){
    const that = this;
    that.getDataListPage();    //进入页面就要显示已经请求完了的数据，所以要把getlist（）放在onLoad里面 
  },

  getDataListPage() {
      var that = this;
      var pageIndex = that.data.pageIndex;
      var pageSize = that.data.pageSize;
      var params={
         pageIndex:pageIndex,
         pageSize:pageSize,
      }
      console.log(params), 
      wx.request({      
      url: app.globalData.apiUrl+"/v1/match-admin/custom-base-info",   //字符串拼接传递参数，当is_online=navi,也即是 is_online等于0请求未发布的数据，等于1请求招聘中的数据   
      data:params, 
      header: {'content-type': 'application/json'},      
      method: 'GET',
      success:function(res){
          console.log(res.data.data);
          let tableList=res.data.data.dataList;
          that.setData({
            tableList: tableList,
            total:res.data.data.total,
          });
          console.log(tableList);
        }
      })  
    },

    /**
   * 上拉分页
   */
  onReachBottom: function () {
      //上拉分页,将页码加1，然后调用分页函数loadRoom()
      var that = this;
      var pageIndex = that.data.pageIndex;
      var pageSize = that.data.pageSize;
      var total = that.data.total;
      if (total<=pageIndex*pageSize) {
        wx.showToast({
          title: '没有更多资源..',
       })
        return
      }
      pageIndex=pageIndex+1,
      that.setData({
        pageIndex:pageIndex
      });
      console.log(pageIndex);
      setTimeout(function () {
        wx.showToast({
          title: '加载中..',
        }),
        that.getDataListPage();
        that.setData({
          title: "数据加载完毕"
        })
      }, 1000)
    },
  
  customInfo: function(e){
    var item = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: '../customInfo/index?id='+item.id,
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   * 下拉刷新
   */
  onPullDownRefresh: function () {
      var that = this;
      //下拉刷新，将pageNumber和pageSize分别设置成1和5，并初始化数据，让数据重新通过loadRoom()获取
      var pageIndex=that.data.pageIndex;
      if (pageIndex>1) {
        pageIndex=pageIndex-1;
      }
      that.setData({
        pageIndex: pageIndex,
      })
      setTimeout(function () {
        wx.showToast({
          title: '加载中..',
        }),
        that.getDataListPage();
        that.setData({
          title: "数据加载完毕"
        })
      }, 1000)
      wx.stopPullDownRefresh();
    },  
})