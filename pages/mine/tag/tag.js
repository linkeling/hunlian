var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hobbyList: ['旅游','电影','唱歌','阅读','健身','摄影','猫咪','狗狗','做饭','桌游','理财','乐器','美食','美术','跑步','游泳','篮球','足球','网球','羽毛球','乒乓球','文学','跳舞','逛街','话剧','看剧','小说','书法','历史','地理','军事','代码','游戏','动漫','德扑','听歌','瑜伽','英文歌'],
    evaluationList: ['风趣幽默','自律','内敛','细节控','学霸','学渣','直率','成熟稳重','自来熟','开朗','独立','喜欢被照顾','爱照顾人','慢热','忙成狗','热情','有点敏感','真诚靠谱','名校控','努力','可爱','幽默','有责任心','勤俭持家','有耐心','爱撒娇','有点洁癖','萌妹子','母胎单身','文艺青年','乐观自信','偏保守','身高控','完美主义','有点颜控','顾家','佛系','有气质','吃货','外冷内热'],
    userTags:[],
    otherList: ['985','211','海归','一本','二本','三本','不抽烟','抽烟','不醺酒','会做饭','独生子女','非独生子女','有房','有车','城镇家庭','农村家庭','有宗教信仰','无宗教信仰'],
    tagList:[],
    userTags:[],
    params:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    const that = this;
    let arr = [];
    if(options.params === 'hobby'){
      arr = that.data.hobbyList;
    }
    if(options.params === 'evaluation'){
      arr = that.data.evaluationList;
    }
    if(options.params === 'other'){
      arr = that.data.otherList;
    }
    that.setData({
      params: options.params,
      tagList:arr,
      userTags:JSON.parse(options.userTags)
    })
  },
  selectItem(e) {
    let that = this;
    let tag = e.currentTarget.dataset.value;
    if(!that.data.userTags.includes(tag)){
      that.data.userTags.push(tag);
    }
    this.setData({
      userTags: that.data.userTags
    })
  },
  deleteItem(e) {
    let that = this;
    let tag = e.currentTarget.dataset.value;
    for (let i = 0; i < that.data.userTags.length; i++) {
      if(that.data.userTags[i] === tag){
        that.data.userTags.splice(i,1);
      }
    }
    this.setData({
      userTags: that.data.userTags
    })
  },
  confirm: function (e) {
    let that = this;
    const wxCurrPage = getCurrentPages(); // 获取当前页面的页面栈
    const wxPrevPage = wxCurrPage[wxCurrPage.length - 2]; // 获取上级页面的page对象
    if (wxPrevPage) {
      // 修改上级页面的数据
      if(that.data.params === 'hobby'){
        wxPrevPage.setData({
          hobbyTags: that.data.userTags, // baseData为上级页面的某个数据
        })
      }
      if(that.data.params === 'evaluation'){
        wxPrevPage.setData({
          evaluationTags: that.data.userTags, // baseData为上级页面的某个数据
        })
      }
      if(that.data.params === 'other'){
        wxPrevPage.setData({
          otherTags: that.data.userTags, // baseData为上级页面的某个数据
        })
      }
    }
    wx.navigateBack();
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  }
  
})