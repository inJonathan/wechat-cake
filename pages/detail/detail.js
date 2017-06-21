var Zan = require('../../dist/index');
var WxParse = require('../../wxParse/wxParse.js');

Page(Object.assign({}, Zan.Quantity, {
  data: {
    imgUrls: [
      'http://www.xcxkj.tech/images/xnj/t2.jpg',
      'http://www.xcxkj.tech/images/xnj/t1.jpg',
      'http://www.xcxkj.tech/images/xnj/t3.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    showDialog: false,
    quantity: {
      quantity: 1,
      min: 1,
      max: 20
    }
  },
  toggleDialog() {
    this.setData({
      showDialog: !this.data.showDialog
    });
  },
  onLoad() {
    var article = '123';
    var that = this;
    WxParse.wxParse('article', 'html', article, that);
  },
  handleZanQuantityChange(e) {
    var componentId = e.componentId;
    var quantity = e.quantity;

    this.setData({
      [`${componentId}.quantity`]: quantity
    });
  }
}));