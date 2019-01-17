module.exports = (url, data) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `https://locally.uieee.com/${url}`,
      header: {
        'Content-Type': 'json'
      },
      data,
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}