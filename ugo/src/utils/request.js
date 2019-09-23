export default function (obj) {
  let url = obj.url || ''
  let method = obj.method || 'get'
  let data = obj.data || {}
  url = 'https://www.uinav.com' + url
  // url = 'https://autumnfish.cn/wx' + url
  return new Promise((resolve, reject) => {
    mpvue.showLoading({title: '正在加载'})
    mpvue.request({
      url,
      method,
      data,
      success: (info) => {
        resolve(info.data)
      }
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 2000)
  })
}