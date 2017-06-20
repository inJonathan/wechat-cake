Page({
  data: {
    current: 1
  },
  onLoad() {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
  },
  tapTpye(event) {
    this.setData({
      current: event.currentTarget.dataset.current
    })
  }

})