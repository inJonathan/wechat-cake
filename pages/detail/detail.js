var app = getApp();
var Zan = require('../../dist/index');
var WxParse = require('../../wxParse/wxParse.js');
var gooddata = require('../../GoodData.js');
var gooddata_other = require('../../GoodData_other.js');
var GoodData = {};

Page(Object.assign({}, Zan.Quantity, Zan.TopTips, {
  data: {
    imgUrls: [],
    goodName: "加载中...",
    currentPrice: "0.00",
    originalPrice: "0.00",
    detail: "",
    kinds: [],
    kindName: "",
    current: 0,
    total: 0,
    count: 1,
    cartGoodCount: 0,
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
    let num = 0;

    app.globalData.selectGoods.forEach((item, index) => {
      // 通过唯一的kid判断购物车是否已经存在商品
      if (this.data.kid == item.kid) {
        flag = false;
      }
    });
    
    if (flag) {
      app.globalData.selectGoods.push({
        "goodName": this.data.goodName,
        "gid": GoodData.gid,
        "kid": this.data.kid,
        "currentPrice": this.data.currentPrice,
        "kindName": this.data.kindName,
        "smpic": this.data.smpic,
        "total": this.data.total,
        "count": this.data.count,
        "checked": true
      });
      this.upDateCount();
      this.showZanTopTips('加入购物城成功');
      console.log(app.globalData.selectGoods);
    } else {
      wx.showToast({
        title: '已在购物车',
        icon: 'success',
        duration: 1000
      });
    }
    this.toggleDialog();
  },
  onLoad(option) {
    let _this = this;
    // wx.request({
    //   url: 'https://xxx' + option.gid, // 通过商品ID请求相应数据
    //   data: {},
    //   success: function (res) {
    //     GoodData = res.data;
    //     _this.initData();
    //   }
    // });

    // 这里判断仅做测试不同详情页使用，实际开发应通过列表页传过来的gid去请求服务器数据
    if (option.gid == 4) {
      GoodData = gooddata_other
    } else {
      GoodData = gooddata;
    }

    _this.initData();
  },
  onShow() {
    this.upDateCount();
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
      kindName: GoodData.kinds[event.currentTarget.dataset.current].kindName,
      total: GoodData.kinds[event.currentTarget.dataset.current].total,
      quantity: {
        quantity: 1,
        min: 1,
        max: GoodData.kinds[event.currentTarget.dataset.current].total
      },
      smpic: GoodData.kinds[event.currentTarget.dataset.current].smpic,
      count: 1
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
      currentPrice: GoodData.currentPrice,
      originalPrice: GoodData.originalPrice,
      kinds: GoodData.kinds,
      kid: GoodData.kinds[0].kid,
      kindName: GoodData.kinds[0].kindName,
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
  upDateCount() {
    let count = 0;
    app.globalData.selectGoods.forEach((item, index) => {
      count += item.count;
    });
    this.setData({
      cartGoodCount: count
    })
  }
}));