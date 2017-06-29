App({
  globalData: {
    selectGoods: [
      // {
      //   "gid": 1,
      //   "kid": 1,
      //   "count": 3,
      //   "stock": 18,
      //   "checked": true
      // }
    ]
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
              wx.request({
                url: 'https://xcxkj.tech/xcxi//weixin/user/signlogin',
                header: { "content-type": "application/x-www-form-urlencoded" },
                method: 'post',
                data: r_data,
                success: function (res) {
                  console.log(res)
                },
                fail: function (res) {
                  wx.showModal({
                    title: '提示',
                    content: 'error:网络请求失败',
                    showCancel: false
                  })
                  return false;
                }
              });
              that.globalData.userInfo = res.userInfo;
              typeof cb == "function" && cb(that.globalData.userInfo);
            }
          });
        }
      });
    }
  },
  getStorageCart() {
    let _this = this;
    let keys = wx.getStorageInfoSync().keys;
    if (!contains(keys, "userCart")) { // 如果不存在这个数据就给他初始化
      wx.setStorage({
        key: "userCart",
        data: [
          {
            "openId": "",
            "selectGoods": []
          }
        ]
      })
    }

    function contains(arr, obj) {
      var i = arr.length;
      while (i--) {
        if (arr[i] === obj) {
          return true;
        }
      }
      return false;
    }
  }
});
