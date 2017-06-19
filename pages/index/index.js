var Zan = require('../../dist/index');
var Data = require('../../data.js');

Page(Object.assign({}, Zan.Tab, {
  data: {
    isLoading: true,
    index_tab: {}
  },
  onLoad: function () {
    setTimeout(() => {
      this.setData({
        isLoading: false
      });
    }, 1000);
    let goods = [];
    for (let i in Data.type) {
      let good = {};
      good.id = Data.type[i].tid;
      good.title = Data.type[i].name;
      goods.push(good);
    }
    this.setData({
      index_tab: {
        list: goods,
        selectedId: 1,
        scroll: false
      }
    });

  },
  handleZanTabChange(e) {
    var componentId = e.componentId;
    var selectedId = e.selectedId;
    console.info(selectedId)
    this.setData({
      [`${componentId}.selectedId`]: selectedId
    });
  }
}));
