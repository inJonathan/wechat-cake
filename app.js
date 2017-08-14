App({
  globalData: {
    selectGoods: []
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo);
    } else {
      //调用登录接口
      wx.login({
        success: function (res) { // 获取用户openid
          let code = res.code;
          wx.getUserInfo({
            success: function (res) {
              let r_data = {};
              r_data.code = code;
              r_data.encryptedData = res.encryptedData;
              r_data.iv = res.iv;
              // wx.request({
              //   url: 'https://xxx',
              //   header: { "content-type": "application/x-www-form-urlencoded" },
              //   method: 'post',
              //   data: r_data,
              //   success: function (res) {
              //     console.log(res)
              //   },
              //   fail: function (res) {
              //     wx.showModal({
              //       title: '提示',
              //       content: 'error:网络请求失败',
              //       showCancel: false
              //     })
              //     return false;
              //   }
              // });
              that.globalData.userInfo = res.userInfo;
              typeof cb == "function" && cb(that.globalData.userInfo);
            }
          });
        }
      });
    }
  }
});
