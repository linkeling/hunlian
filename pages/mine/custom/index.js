var app = getApp();

Page({
  data: {
     addrssCh: ['云南省', '昆明市', ' 五华区'],
     addrsscode: ['530000', '530100', '530102'],
     genderList: [{id: 1, name: '男'}, {id: 2, name: '女'}],
     educationList: ['博士','硕士','本科','大专','中专','初中及以下','文盲或半文盲'],
     educationIndex: 0,
     professionList: ['公务员','事业单位'],
     hasAndNoList: [{id: 1, name: '有'}, {id: 2, name: '无'}],
     yesAndNoList: [{id: 1, name: '是'}, {id: 2, name: '否'}],
     date:"2000-01-01",
     hobbyTags:[],
     hobbys:[],  // 页面显示标签
  },

  adrssChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      addrsscode: e.detail.value
    })
  },

  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  bindDateChange:function(e){
    this.setData({
      date:e.detail.value
    })
  },

  onLoad: function () {
    
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
  }
})