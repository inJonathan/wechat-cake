var ListData = require('../../ListData.js');

Page({
  data: {
    isLoading: true,
    current: 1,
    typeData: {},
    listData: {}
  },
  onLoad() {
    console.log(ListData.type)

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
      typeData: ListData.type
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
  setGoodList(obj) {
    for (let i in ListData.type) {
      if (ListData.type[i].tid == obj) {
        this.setData({
          listData: ListData.type[i]
        });
      }
    }
  }

})