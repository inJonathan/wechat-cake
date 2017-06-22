var Zan = require('../../dist/index');

Page(Object.assign({}, Zan.Tab, {
  data: {
    isLoading: true,
    orderTab: {
      list: [{
        id: '1',
        title: '全部'
      }, {
        id: '2',
        title: '待付款'
      }, {
        id: '3',
        title: '待发货'
      }, {
        id: '4',
        title: '待收货'
      }, {
        id: '5',
        title: '已完成'
      }],
      selectedId: '1',
      scroll: false,
      height: 45
    }
  },
  onLoad: function () {

    // 模拟请求
    setTimeout(() => {
      this.setData({
        isLoading: false
      });
    }, 500);

  },
  handleZanTabChange(e) {
    var componentId = e.componentId;
    var selectedId = e.selectedId;
    console.log(selectedId);
    this.setData({
      [`${componentId}.selectedId`]: selectedId
    });
  }
}));
