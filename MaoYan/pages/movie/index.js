Page({
  data: {
    tabIndex: 'hots',
    hots: []
  },
  switch: function (e) {
    this.setData({
      tabIndex: e.target.dataset.tabIndex
    })
  },
  onLoad: function () {
    var _this = this;
    wx.request({
      url: 'https://wx.maoyan.com/mmdb/movie/v2/list/hot.json',
      method: 'get',
      data: {
        limit: 12,
        offset: 0,
        ct: '北京'
      },
      success: function (info) {
        info.data.data.hot.forEach(function (val) {
          val.img = val.img.replace('w.h', '128.180')
        })
        _this.setData({
          hots: info.data.data.hot
        })
      }
    })
  }
});