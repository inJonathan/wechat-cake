var app = getApp();

Page({
  data: {
    userInfo: {},
    cartGoodCount: 0,
  },
  onLoad() {
    let _this = this;
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
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
  },
  goCart() {
    wx.navigateTo({
      url: '../cart/cart',
    })
  },
  onShow() {
    this.upDateCount();
  },
  upDateCount() {
    let count = 0;
    app.globalData.selectGoods.forEach((item, index) => {
      count += item.count;
    });
    this.setData({
      cartGoodCount: count
    })
  }
})