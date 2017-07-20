var app = getApp();
var Zan = require('../../dist/index');
var goodlistdata = require('../../GoodList.js');
var GoodList = {};

Page(Object.assign({}, Zan.Quantity, {
  data: {
    empty: false,
    isLoading: true,
    checkboxItems: [],
    checkAll: true,
    isEdit: false,
    total: '0.00',
    unable: ''
  },
  onLoad() {
    this.upDateList();
  },
  checkboxChange: function (e) {
    // 子项影响全选
    let allItems = this.data.checkboxItems.length;
    if (e.detail.value.length == allItems) {
      this.setData({
        checkAll: true
      });
    } else {
      this.setData({
        checkAll: false,
      });
    }
    // 处理选择一项
    var checkboxItems = this.data.checkboxItems, values = e.detail.value;
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      checkboxItems[i].checked = false;
      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (checkboxItems[i].value == values[j]) {
          checkboxItems[i].checked = true;
          break;
        }
      }
    }
    this.setData({
      checkboxItems: checkboxItems
    });
    // console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    this.upDateTotal()
  },
  checkAll(e) { // 处理全选按钮
    let checkboxItems = this.data.checkboxItems;
    if (e.detail.value == 'checkAll') {
      for (let i in checkboxItems) {
        checkboxItems[i].checked = true;
        this.setData({
          checkboxItems: checkboxItems
        });
      }
    } else {
      for (let i in checkboxItems) {
        checkboxItems[i].checked = false;
        this.setData({
          checkboxItems: checkboxItems
        });
      }
    }
    let checkAll = this.data.checkAll;
    this.setData({
      checkAll: !checkAll
    });
    // console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    this.upDateTotal();
  },
  goIndex() {
    wx.switchTab({
      url: '../index/index'
    });
  },
  toggleEdit() {
    let isEdit = this.data.isEdit;
    this.setData({
      isEdit: !isEdit
    });
  },
  handleZanQuantityChange(e) {
    let componentId = e.componentId;
    let quantity = e.quantity;
    let checkboxItems = this.data.checkboxItems;
    let selectGoods = app.globalData.selectGoods;
    this.setData({
      [`${componentId}.quantity`]: quantity
    });
    checkboxItems.forEach((i, j) => {
      if (j == componentId.replace(/[^0-9]/ig, "")) {
        i.count = quantity;
        selectGoods.forEach((k, o)=>{
          if (o == componentId.replace(/[^0-9]/ig, "")) {
            app.globalData.selectGoods[o] = i;
          }
        })
      }
    });
    this.setData({
      checkboxItems: checkboxItems
    });
    this.upDateTotal();
  },
  upDateList() {
    let _this = this;
    let selectGoods = app.globalData.selectGoods;
    let goodArr = [];

    // 判断购物车为空
    if (selectGoods.length == 0) {
      _this.setData({
        empty: true
      });
      return;
    }

    // wx.request({
    //   url: 'https://xcxkj.tech/xcxi/weixin/goods/goodlist',
    //   data: {},
    //   success: function (res) {
    //     GoodList = res.data;
    //     setTimeout(() => {
    //       // 遍历出所有商品，获得对应id的商品信息
    //       GoodList.type.forEach((i) => {
    //         i.goods.forEach((j) => {
    //           selectGoods.forEach((k, index) => {
    //             if (j.gid == k.gid) {
    //               let goodItem = {
    //                 gid: j.gid,
    //                 pic: j.pic,
    //                 name: j.name,
    //                 kindName: "规格1",
    //                 price: j.currentPrice,
    //                 value: j.gid,
    //                 checked: true,
    //                 count: k.count,
    //                 quantity: {
    //                   quantity: k.count,
    //                   min: 1,
    //                   max: k.stock
    //                 }
    //               }
    //               goodArr.push(goodItem);
    //             }
    //           })
    //         })
    //       });
    //       _this.setData({
    //         checkboxItems: goodArr,
    //         isLoading: false
    //       });
    //       _this.upDateTotal();
    //     }, 300);
    //   }
    // });

    GoodList = goodlistdata;
    setTimeout(() => {
      // 遍历出所有商品，获得对应id的商品信息
      GoodList.type.forEach((i) => {
        i.goods.forEach((j) => {
          selectGoods.forEach((k, index) => {
            if (j.gid == k.gid) {
              let goodItem = {
                gid: j.gid,
                pic: j.pic,
                name: j.name,
                kindName: "规格1", // 判断选择规格部分目前没有完成，这里默认都是规格1
                price: j.currentPrice,
                value: j.gid,
                checked: true,
                count: k.count,
                quantity: {
                  quantity: k.count,
                  min: 1,
                  max: k.stock
                }
              }
              goodArr.push(goodItem);
            }
          })
        })
      });
      _this.setData({
        checkboxItems: goodArr,
        isLoading: false
      });
      _this.upDateTotal();
    }, 300);
  },
  upDateTotal() { // 更新总价
    let totalPrice = 0;
    let checkboxItems = this.data.checkboxItems;
    let allItems = this.data.checkboxItems.length;
    let arr = [];
    checkboxItems.forEach((i) => {
      if (i.checked == true) {
        totalPrice += parseFloat(i.price) * i.count;
        this.setData({
          total: totalPrice.toFixed(2)
        });
        arr.push(i)
      }
    });
    if (arr.length == 0) { // 如果全不选总价为0
      this.setData({
        total: '0.00'
      });
    }
  },
  delGood(e) { // 删除商品
    wx.showToast({
      title: '删除中',
      icon: 'loading',
      duration: 500
    });

    let delId = e.currentTarget.dataset.gid;
    let selectGoods = app.globalData.selectGoods;
    let arr = [];
    selectGoods.forEach((i) => {
      if (delId != i.gid) {
        arr.push(i);
      }
    })
    app.globalData.selectGoods = arr;
    this.upDateList();
  },
  goConfirm() {
    console.log(this.data.checkboxItems)
  },
  goIndex() {
    wx.switchTab({
      url: '../index/index'
    });
  }
}));