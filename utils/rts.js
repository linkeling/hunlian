

/** 提示输出 */
function toast(obj) {
  wx.showToast({
    title: obj.title,
    icon: obj.icon,
    duration: obj.duration
  })
}

/**
 * 发起的是 HTTPS Get请求
 * @pram url: 请求地址,协议必须为https
 * @param success 请求成功回调
 * @param fail 请求失败回调
 * @param complete 请求完成（成功或者失败）回调
 */
function rtGet(url, success, fail, complete) {
  var _url = url, _success = success, _fail = fail, _complete = complete;
  wx.request({
    url: url, method: "GET", dataType: "json",
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ' + wx.getStorageSync("session").token
    },
    success: function (res) {
      if (typeof _success == "function") {
        if (res.data.status == 404 || res.data.status == 500) {
          wx.setStorageSync('isServer', 1);
          wx.showToast({ title: '网络错误', icon: 'loading', duration: 2000 });
        } else { 
          wx.setStorageSync('isServer', 0); 
          _success(res.data);
        }
      }
    },fail: function (res) {
      if (typeof _fail == "function") { _fail(res); }
      if (typeof _fail == "string") { //请求失败的弹框提示
        wx.showToast({ title: _fail, icon: 'loading', duration: 2000 });
      }
    },complete: function (res) {
      if (typeof _complete == "function") { _complete(res); }
    }
  });
}

/**
 * 发起的是 HTTPS Post请求（json方式请求）
 * @pram url: 请求地址,协议必须为https
 * @pram data 请求参数请求参数
 * @param success 请求成功回调
 * @param fail 请求失败回调
 * @param complete 请求完成（成功或者失败）回调
 */
function rtPostJson(url, data, success, fail, complete) {
  var _url = url, _data = data, _success = success, _fail = fail, _complete = complete;
  wx.request({
    url: url, data: data, method: "POST", dataType: "json",
    header: {
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + wx.getStorageSync("session").token
    },success: function (res) {
      if (typeof _success == "function") { 
        if (res.statusCode == 404 || res.statusCode == 500) {
          wx.setStorageSync('isServer', 1);
          wx.showToast({ title: '网络错误', icon: 'loading', duration: 2000 });
        } else { wx.setStorageSync('isServer', 0); }
        _success(res.data);
      }
    },fail: function (res) {
      if (typeof _fail == "function") { _fail(res); }
    },complete: function (res) {
      if (typeof _complete == "function") { _complete(res); }
    }
  });
}
/**
 * 发起的是 HTTPS Post请求（form表单请求）
 * @pram url: 请求地址,协议必须为https
 * @pram data 请求参数请求参数
 * @param success 请求成功回调
 * @param fail 请求失败回调
 * @param complete 请求完成（成功或者失败）回调
 */
function rtPostForm(url, data, success, fail, complete) {
  var _url = url, _data = data, _success = success, _fail = fail, _complete = complete;
  wx.request({
    url: url, data: data, method: "POST", dataType: "json",
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ' + wx.getStorageSync("session").token
    },success: function (res) {
      if (typeof _success == "function") { 
        if (res.statusCode == 404 || res.statusCode == 500) {
          wx.setStorageSync('isServer', 1);
          wx.showToast({ title: '网络错误', icon: 'loading', duration: 2000 });
        } else { wx.setStorageSync('isServer', 0); }
        _success(res.data); 
      }
    },fail: function (res) {
      if (typeof _fail == "function") { _fail(res); }
    },complete: function (res) {
      if (typeof _complete == "function") { _complete(res); }
    }
  });
}



/**
 * 发起的是 HTTPS Post请求(用于无状态)
 * @pram url: 请求地址,协议必须为https
 * @pram data 请求参数请求参数
 * @param success 请求成功回调
 * @param fail 请求失败回调
 * @param complete 请求完成（成功或者失败）回调
 */
function rtPostAll(url, data, success, fail, complete) {
  var _url = url, _data = data, _success = success, _fail = fail, _complete = complete;
  wx.request({
    url: url, data: data, method: "POST", dataType: "json",
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      if (res.statusCode == 404 || res.statusCode == 500) {
        wx.setStorageSync('isServer', 1);
        wx.showToast({ title: '异常重试中', icon: 'loading', duration: 2000 });
      }else{ wx.setStorageSync('isServer', 0); }
      if (typeof _success == "function") { _success(res.data); }
    },fail: function (res) {
      if (typeof _fail == "function") { _fail(res); }
    },complete: function (res) {
      if (typeof _complete == "function") { _complete(res); }
    }
  });
}
//登录鉴权,本地缓存登录状态(令牌code、用户信息、鉴权域)
function initLogin(globa, cb, complete) {
  wx.login({
    success: function (event) {
      console.log(event)
      // 获取到请求码，继续请求用户的基本信息
      if (event.code) {
        var code = event.code;
        wx.getUserInfo({
          success: function (res) {
            console.log(res)
            if (typeof cb == "function") { cb(res); }
            //请求后台鉴权，获取会话信息
            var url = globa.apiUrl + "user/login";
            wx.setStorageSync('user', res);
            wx.setStorageSync('isServer', 0);
            wx.setStorageSync('session',  new Date().getTime());
            return;
            var data = {
              appId: globa.wxappId,
              code: code,
              crypt: res.encryptedData,
              iv: res.iv
            }
            // "city": "string",
            // "code": "string",
            // "encryptedData": "string",
            // "gender": 0,
            // "iv": "string",
            // "nickName": "string",
            // "province": "string",
            // "signature": "string",
            // "unionId": "string"
            rtPostAll(url, data, function (res) {
              console.log(res);
              //服务异常
              if (res.status == 404 || res.status == 500){
                wx.setStorageSync('isServer', 1);
                wx.showToast({ title: '异常重试中', icon: 'loading', duration: 2000 });
              }else{
                wx.setStorageSync('isServer', 0);
                wx.setStorageSync('session', res);
              }
              if (typeof cb == "function") { cb(); }
            }, function (res) { //fail
              wx.setStorageSync('isServer', 1);
              wx.showToast({ title: '异常重试中', icon: 'loading', duration: 2000 });
            }, function (res) { //complete
              if (typeof complete == "function") { complete(); }
            });
          },fail: function (err) {
            console.log(err)
            wx.showToast({ title: '用户拒绝授权', icon: 'loading', duration: 2000 });
          }
        })
      } else {
        wx.showToast({ title: '微信登录失败', icon: 'loading', duration: 2000 });
      }
    },fail: function (res) {
      wx.showToast({ title: '微信登陆失败！', icon: 'loading', duration: 2000 });
    }
  })
}

//json数据转换为表单提交
function json2Form(json) {
  var str = [];
  for (var p in json) {
    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
  }
  return str.join("&");
}

//对外公开函数
module.exports = {
  initLogin: initLogin,
  rtGet: rtGet,
  rtPostJson: rtPostJson,
  rtPostForm: rtPostForm,
  rtPostAll: rtPostAll,
  json2Form: json2Form
}  