var Zan = require('../../dist/index');

Page(Object.assign({}, Zan.Tab, {
  data: {
    tab1: {
      list: [{
        id: 'jip',
        title: '鸡排'
      }, {
        id: 'bingy',
        title: '冰饮'
      }, {
        id: 'taoc',
        title: '套餐'
      }],
      selectedId: 'jip',
      scroll: false
    }
  },
  onLoad: function () {
    
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
