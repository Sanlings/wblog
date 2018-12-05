//app.js
const Towxml = require('/towxml/main');
App({
  onLaunch: function () {
      // 登录
      wx.login({
          success: res => {
              // 发送 res.code 到后台换取 openId, sessionKey, unionId
              console.log(res);
              wx.request({
                  url: 'http://localhost/proj_online_class/server/public/index.php/verify/verify/get_verify',
                  method: 'post',
                  header: {
                      'content-type': 'application/x-www-form-urlencoded'
                  },
                  data: {
                      code: res.code
                  },
                  success: function (result) {
                      console.log('success', res.code);
                      console.log('get', result.data);
                  }
              })
          }
      })
  },
  towxml:new Towxml(),
  globalData: {
    userInfo: null
  }
})