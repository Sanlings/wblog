//app.js
const Towxml = require('/towxml/main');
const _Gdata = {
    api: {
        // 获取openId, sessionKey, unionId接口
        verify: 'https://' ,
        
        // 获取初始化数据
        init: 'https://',
        
        // 获取文章内容
        detail: 'https://',
    },
    conf: {
        // 获取更多
        getmore: true,
        
        // 分页长度
        range_length: 15
    }
};

App({
  onLaunch: function () {
      // 登录
      wx.login({
          success: res => {
              // 发送 res.code 到后台换取 openId, sessionKey, unionId
              wx.request({
                  url: _Gdata.api.verify,
                  method: 'post',
                  header: {
                      'content-type': 'application/x-www-form-urlencoded'
                  },
                  data: {
                      code: res.code
                  },
                  success: function (result) {
                      
                  }
              })
          }
      })
  },
  towxml:new Towxml(),
  globalData: {
    userInfo: null,
    api: _Gdata.api,
    conf: _Gdata.conf
  }
})