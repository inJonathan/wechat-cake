const App = getApp();

Page({
  data: {
    userInfo: {}
  },
  onLoad() {
    let _this = this;
    //调用应用实例的方法获取全局数据
    App.getUserInfo(function (userInfo) {
      //更新数据
      _this.setData({
        userInfo: userInfo
      })
    });
  },
  goOrder(event) {
    wx.navigateTo({
      url: '../order/order'
    });
  }
})