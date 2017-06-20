var Zan = require('../../dist/index');
var ListData = require('../../ListData.js');

Page(Object.assign({}, Zan.Tab, {
  data: {
    isLoading: true,
    index_tab: {},
    listData: {}
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
    for (let i in ListData.type) {
      let typeItem = {};
      if (ListData.type[i].recommended) {
        typeItem.id = ListData.type[i].tid;
        typeItem.title = ListData.type[i].name;
        types.push(typeItem);
      }
    }
    this.setData({
      index_tab: {
        list: types,
        selectedId: 1,
        scroll: false
      }
    });

    // 初始化商品列表
    this.setGoodList(1);

  },
  setGoodList(obj) {
    for (let i in ListData.type) {
      if (ListData.type[i].tid == obj) {
        this.setData({
          listData: ListData.type[i]
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
  }
}));
