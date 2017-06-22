var GoodList = require('../../GoodList.js');

Page({
  data: {
    isLoading: true,
    current: 1,
    typeData: {},
    goodData: {}
  },
  onLoad() {

    // 模拟请求
    setTimeout(() => {
      this.setData({
        isLoading: false
      });
    }, 500);

    // 初始化scroll-view高度
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });

    // 初始化商品列表
    this.setData({
      typeData: GoodList.type
    });

    // 初始化商品列表
    this.setGoodList(1);

  },
  tapTpye(event) {
    this.setData({
      current: event.currentTarget.dataset.current
    });
    this.setGoodList(event.currentTarget.dataset.current);
  },
  tapGood(event) {
    wx.navigateTo({
      url: '../detail/detail?gid=${event.currentTarget.dataset.gid}'
    });
  },
  setGoodList(typ) {
    for (let i in GoodList.type) {
      if (GoodList.type[i].tid == typ) {
        this.setData({
          goodData: GoodList.type[i]
        });
      }
    }
  }

})