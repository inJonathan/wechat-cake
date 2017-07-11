var GoodList = {};
var goodlistdata = require('../../GoodList.js');

Page({
  data: {
    isLoading: true,
    typeData: {},
    goodData: {}
  },
  onLoad() {
    let _this = this;
    // wx.request({
    //   url: 'https://xcxkj.tech/xcxi/weixin/goods/goodlist',
    //   data: {},
    //   success: function (res) {
    //     setTimeout(() => {
    //       _this.setData({
    //         isLoading: false
    //       });
    //     }, 300);
    //     GoodList = res.data;
    //     _this.initData();
    //   }
    // })

    // 模拟获取数据
    setTimeout(() => {
      _this.setData({
        isLoading: false
      });
    }, 300);
    GoodList = goodlistdata;
    _this.initData();

    // 初始化scroll-view高度
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });

  },
  initData() {
    let orderArr = [];
    let types = [];
    for (let i in GoodList.type) {
        orderArr.push(GoodList.type[i].tid);
    }

    // 拿到最大的ID设为初始化分类
    let orderId = Math.max(...orderArr);

    this.setData({
      current: orderId,
      typeData: GoodList.type
    });

    // 初始化商品列表
    this.setGoodList(orderId);
  },
  tapTpye(event) {
    this.setData({
      current: event.currentTarget.dataset.current
    });
    this.setGoodList(event.currentTarget.dataset.current);
  },
  tapGood(event) {
    wx.navigateTo({
      url: '../detail/detail?gid=' + event.currentTarget.dataset.gid
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