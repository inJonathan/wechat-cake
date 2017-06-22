var Zan = require('../../dist/index');
var WxParse = require('../../wxParse/wxParse.js');
var GoodData = require('../../GoodData.js');

Page(Object.assign({}, Zan.Quantity, {
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
    smpic: "",
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    showDialog: false,
    quantity: {}
  },
  toggleDialog() {
    this.setData({
      showDialog: !this.data.showDialog
    });
  },
  onLoad() {
    this.setData({
      imgUrls: GoodData.pic,
      goodName: GoodData.name,
      now: GoodData.currentPrice,
      old: GoodData.originalPrice,
      kinds: GoodData.kinds,
      currkind: GoodData.kinds[0].kname,
      total: GoodData.kinds[0].total,
      quantity: {
        quantity: 1,
        min: 1,
        max: GoodData.kinds[0].total
      },
      smpic: GoodData.kinds[0].smpic
    });
    var article = GoodData.detail;
    var that = this;
    WxParse.wxParse('article', 'html', article, that);

  },
  handleZanQuantityChange(e) {
    var componentId = e.componentId;
    var quantity = e.quantity;

    this.setData({
      [`${componentId}.quantity`]: quantity
    });
  },
  tapKind(event) {
    this.setData({
      current: event.currentTarget.dataset.current,
      currkind: GoodData.kinds[event.currentTarget.dataset.current].kname,
      total: GoodData.kinds[event.currentTarget.dataset.current].total,
      quantity: {
        quantity: 1,
        min: 1,
        max: GoodData.kinds[event.currentTarget.dataset.current].total
      },
      smpic: GoodData.kinds[event.currentTarget.dataset.current].smpic
    });
  },
  goIndex() {
    wx.switchTab({
      url: '../index/index'
    });
  }
}));