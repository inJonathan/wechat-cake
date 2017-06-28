var app = getApp();
var Zan = require('../../dist/index');
var WxParse = require('../../wxParse/wxParse.js');
// var GoodData = require('../../GoodData.js');
var GoodData = {};
var storeId = 123;

Page(Object.assign({}, Zan.Quantity, Zan.TopTips, {
  data: {
    imgUrls: [],
    goodName: "加载中...",
    now: "0.00",
    old: "0.00",
    detail: "",
    kinds: [],
    currkind: "",
    current: 0,
    total: 0,
    count: 1,
    smpic: "",
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    showDialog: false,
    quantity: {},
    goOrder: true
  },
  toggleDialog(e) {
    let gowhere;
    if (e) {
      gowhere = e.currentTarget.dataset.gowhere;
    }
    if (gowhere && gowhere == 'cart') {
      this.setData({
        goOrder: false
      });
    } else {
      setTimeout(() => {
        this.setData({
          goOrder: true
        });
      }, 300)
    }
    this.setData({
      showDialog: !this.data.showDialog
    });
  },
  addToCart() { // 加入购物车
    let flag = true;
    if (app.globalData.selectGoods.length > 0) {
      app.globalData.selectGoods.forEach((item, index) => {
        if (item.gid == GoodData.gid) {
          app.globalData.selectGoods.splice(index, 1); // 删除重复数据
        }
      })
    }
    app.globalData.selectGoods.push({
      "gid": GoodData.gid,
      "kid": this.data.kid,
      "count": this.data.count,
      "checked": true
    });

    this.showZanTopTips('加入购物城成功');
    this.toggleDialog();
  },
  onLoad(option) {
    let _this = this;
    wx.request({
      url: 'https://xcxkj.tech/xcxi/weixin/goods/' + storeId + '/' + option.gid,
      data: {},
      success: function (res) {
        GoodData = res.data;
        _this.initData();
      }
    });
  },
  handleZanQuantityChange(e) {
    var componentId = e.componentId;
    var quantity = e.quantity;
    this.setData({
      [`${componentId}.quantity`]: quantity,
      count: quantity
    });
  },
  tapKind(event) {
    this.setData({
      current: event.currentTarget.dataset.current,
      kid: GoodData.kinds[event.currentTarget.dataset.current].kid,
      currkind: GoodData.kinds[event.currentTarget.dataset.current].kindName,
      total: GoodData.kinds[event.currentTarget.dataset.current].stock,
      quantity: {
        quantity: 1,
        min: 1,
        max: GoodData.kinds[event.currentTarget.dataset.current].stock
      },
      smpic: GoodData.kinds[event.currentTarget.dataset.current].smpic
    });
  },
  goIndex() {
    wx.switchTab({
      url: '../index/index'
    });
  },
  goCart() {
    wx.navigateTo({
      url: '../cart/cart',
    })
  },
  initData() {
    this.setData({
      imgUrls: GoodData.pics,
      goodName: GoodData.name,
      now: GoodData.currentPrice,
      old: GoodData.originalPrice,
      kinds: GoodData.kinds,
      kid: GoodData.kinds[0].kid,
      currkind: GoodData.kinds[0].kindName,
      total: GoodData.kinds[0].stock,
      quantity: {
        quantity: 1,
        min: 1,
        max: GoodData.kinds[0].stock
      },
      smpic: GoodData.kinds[0].smpic
    });
    var article = GoodData.detail;
    var that = this;
    WxParse.wxParse('article', 'html', article, that);
  }
}));