var app = getApp();
var rts = require("../../../utils/rts.js");
import WxValidate from "../../../utils/WxValidate";

Page({
  data: {
     livingPlaceName: ['云南省', '昆明市','五华区'],
     livingPlace:'',
     nativePlaceName:['云南省', '昆明市','五华区'],
     nativePlace:'',
     genderList: [{id: 1, name: '男'}, {id: 2, name: '女'}],
     educationList: [{id: 1, name: '博士'}, {id: 2, name: '硕士'},{id: 3, name: '本科'}, {id: 4, name: '大专'}, {id: 5, name: '中专'},{id: 6, name: '初中及以下'}, {id: 7, name: '文盲或半文盲'}],
     educationIndex: 0,
     education: '',
     professionList: [{id: 1, name: '公务员'}, {id: 2, name: '事业单位'}],
     professionIndex:0,
     profession:'',
     hasAndNoList: [{id: 1, name: '有'}, {id: 2, name: '无'}],
     yesAndNoList: [{id: 1, name: '是'}, {id: 2, name: '否'}],
     childInfoList: [{id: 1, name: '没有'}, {id: 2, name: '有，我们住一起'},{id:3,name:'有，偶尔住一起'},{id:3,name:'有，不在身边'}],
     childInfoIndex:0,
     dateBirth:"2000-01-01",
     hobbyTags:[],
     hobbys:[],  // 页面显示标签
     pictureUrl:'',
     picture1Url:'',
     picture2Url:'',
  },

  radioChange: function (e) {
    var key = e.currentTarget.dataset.name;
    this.setData({
      [key]:e.detail.value,
    })
  },

  getValue(e) {
    var that = this;
    var key = e.currentTarget.dataset.name;
    that.setData({
      [key]:e.detail.value,
    })
  },

  livingChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail)
    this.setData({
      livingPlaceName: e.detail.value,
      livingPlace: e.detail.code[2],
    })
  },

  nativePlaceChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail)
    this.setData({
      nativePlaceName: e.detail.value,
      nativePlace: e.detail.code[2],
    })
  },

  
  childInfoChange:function(e) {
    var that = this;
    var children = ''
    for (let i = 0; i < that.data.childInfoList.length; i++) {
      if(i === Number(e.detail.value)){
        children = that.data.childInfoList[i].id;
        this.setData({
          childInfoIndex: e.detail.value,
          children:children,
        })
        return;
      }
    }
  },


  educationChange(e) {
    var that = this;
    var education = ''
    for (let i = 0; i < that.data.educationList.length; i++) {
      if(i === Number(e.detail.value)){
        education = that.data.educationList[i].id;
        this.setData({
          educationIndex: e.detail.value,
          education:education,
        })
        return;
      }
    }
  },


  professionChange(e) {
    var that = this;
    var profession = ''
    for (let i = 0; i < that.data.professionList.length; i++) {
      if(i === Number(e.detail.value)){
        profession = that.data.professionList[i].id;
        this.setData({
          professionIndex: e.detail.value,
          profession:profession,
        })
        return;
      }
    }
  },
  
  bindChooiceProduct: function (e) {  
      console.log(e.currentTarget.dataset)
      var dataId = e.currentTarget.dataset.id;
      var dataName = e.currentTarget.dataset.name;
      var that=this;
      wx.chooseImage({  
      count: 1,  //最多可以选择的图片总数  
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {  
        console.log(res);
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
        var tempFilePaths = res.tempFilePaths[0];  
        //启动上传等待中...  
        wx.showToast({  
          title: '正在上传...',  
          icon: 'loading',  
          mask: true,  
          duration: 10000  
        })  
        var imageUrl=app.globalData.apiUrl + '/v1/match-admin/pictures-info/picture';
        wx.uploadFile({  
          url: imageUrl,  
          filePath: tempFilePaths,  
          name: 'file',
          header: {  
            "Content-Type": "multipart/form-data"  
          },  
          success: function (res) {
            if (res.statusCode == 404 || res.statusCode == 500){
                wx.showToast({ title: '网络错误', icon: 'loading', duration: 1000 });
                wx.hideLoading();
            }
            wx.showToast({
                title: '图片上传完成',
                icon: 'none'
            })
            var pictureInfo=JSON.parse(res.data).data;
            that.setData({
               [dataName]:pictureInfo.id,
               [dataId]:pictureInfo.trueDownloadUrl,
            })
        },
        fail: function (error) {
            wx.showToast({
                title: '上传失败',
                icon: 'none',
                duration: 1000
            })
        }
        });  
        }
      });
    },

  

  bindDateChange:function(e){
    this.setData({
      dateBirth:e.detail.value,
    })
  },

  onLoad: function () {
    this.initValidate();
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

  initValidate() {
    let rules = {
      residentName: {
        required: true,
        maxlength: 10
      },
      gender: {
        required: true
      },
      dateBirth: {
        required: true
      },
      livingPlaceName: {
        required: true
      },
      nativePlaceName: {
        required: true
      },
      height: {
        required: true,
        maxlength: 4
      },
      weight: {
        required: true
      },
      education: {
        required: true
      },
      profession: {
        required: true
      },
      monthIncome: {
        required: true
      },
      house: {
        required: true
      },
      isCar: {
        required: true
      },
      marriage: {
        required: true
      },
      divorce: {
        required: true
      },
      children: {
        required: true
      },
      personal: {
        required: true,
        maxlength: 200
      },
      family: {
        required: true,
        maxlength: 200
      },
      standard: {
        required: true,
        maxlength: 200
      },
      reject: {
        required: true,
        maxlength: 200
      }
    }

    let message = {
      residentName: {
        required: '请输入昵称',
        maxlength: '名字不能超过10个字'
      },
      gender: {
        required: '请选择性别'
      },
      dateBirth: {
        required: '请选择生日'
      },
      livingPlaceName: {
        required: '请选择现居地'
      },
      nativePlaceName: {
        required: '请选择户籍地'
      },
      height: {
        required: '请输入身高'
      },
      weight: {
        required: '请输入体重'
      },
      education: {
        required: '请选择学历'
      },
      profession: {
        required: '请选择职业'
      },
      monthIncome: {
        required: '请输入月收入'
      },
      house: {
        required: '请选择有无房产'
      },
      isCar: {
        required: '请选择车辆情况'
      },
      marriage: {
        required: '请选择有无婚史'
      },
      divorce: {
        required: '请选择是否接受离异'
      },
      children: {
        required: '请选择有无小孩'
      },
      personal: {
        required: '请输入个人情况介绍',
        maxlength: '个人情况介绍不能大于200字符'
      },
      family: {
        required: '请输入家庭情况',
        maxlength: '家庭情况不能大于200字符'
      },
      standard: {
        required: '请输入择偶标准',
        maxlength: '择偶标准不能大于200字符'
      },
      reject: {
        required: '请输入拒绝情况',
        maxlength: '拒绝情况不能大于200字符'
      }
      
    }
    //实例化当前的验证规则和提示消息
    this.WxValidate = new WxValidate(rules, message);
  },

  
  //报错 
  showModal(error) {
    wx.showModal({
    content: error.msg,
    showCancel: false,
   })
  },

   // 提交个人信息
   submitInfo: function (e) {
    var that = this;
    if (!this.WxValidate.checkForm(that.data)) {
      var error = that.WxValidate.errorList[0]
      this.showModal(error)
      return false
    }
    this.showModal({
      msg: '提交成功'
    })
  },
})