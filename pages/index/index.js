var Zan = require('../../dist/index');
var GoodList = require('../../GoodList.js');

Page(Object.assign({}, Zan.Tab, {
  data: {
    isLoading: true,
    indexTab: {},
    goodData: {}
  },
  onLoad: function () {

    // 模拟请求
    setTimeout(() => {
      this.setData({
        isLoading: false
      });
    }, 500);

    // 初始化tab
    let types = [];
    for (let i in GoodList.type) {
      let typeItem = {};
      if (GoodList.type[i].recommended) {
        typeItem.id = GoodList.type[i].tid;
        typeItem.title = GoodList.type[i].name;
        types.push(typeItem);
      }
    }
    this.setData({
      indexTab: {
        list: types,
        selectedId: 1,
        scroll: false
      }
    });

    // 初始化商品列表
    this.setGoodList(1);

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
      url: '../detail/detail?gid=${event.currentTarget.dataset.gid}'
    });
  }
}));
