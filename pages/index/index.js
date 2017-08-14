var Zan = require('../../dist/index');
var GoodList = {};
var app = getApp();

var goodlistdata = require('../../GoodList.js');

Page(Object.assign({}, Zan.Tab, {
  data: {
    isLoading: true,
    indexTab: {},
    goodData: {}
  },
  onLoad: function () {
    let _this = this;
    // wx.request({
    //   url: '', // 请求url
    //   data: {},
    //   success: function (res) {
    //     setTimeout(() => {
    //       _this.setData({
    //         isLoading: false
    //       });
    //     }, 300);
    //     GoodList = res.data; // 将获得的数据赋值
    //     _this.initData();
    //   }
    // })
    
    // 模拟获取数据
    setTimeout(() => {
      _this.setData({
        isLoading: false
      });
    }, 300);
    GoodList = goodlistdata; // 使用模拟数据赋值
    _this.initData();
  },
  initData() {
    let orderArr = [];
    let types = [];
    for (let i in GoodList.type) {
      let typeItem = {};
      if (GoodList.type[i].recommended) {
        typeItem.id = GoodList.type[i].tid;
        typeItem.title = GoodList.type[i].name;
        types.push(typeItem);
        orderArr.push(GoodList.type[i].tid);
      }
    }
    
    // 拿到最大的ID设为初始化分类
    let orderId = Math.max(...orderArr);

    // 初始化tab
    this.setData({
      indexTab: {
        list: types,
        selectedId: orderId,
        scroll: false
      }
    });

    // 初始化商品列表
    this.setGoodList(orderId);
  },
  setGoodList(typ) {
    for (let i in GoodList.type) {
      if (GoodList.type[i].tid == typ) {
        this.setData({
          goodData: GoodList.type[i]
        });
      }
    }
  },
  handleZanTabChange(e) {
    var componentId = e.componentId;
    var selectedId = e.selectedId;
    this.setGoodList(selectedId);
    this.setData({
      [`${componentId}.selectedId`]: selectedId
    });
  },
  tapGood(event) {
    wx.navigateTo({
      url: '../detail/detail?gid=' + event.currentTarget.dataset.gid
    });
  }
}));
