var app = getApp()
function fetch(url){
  return new Promise((resolve,reject)=>{
    wx.request({
      url,
      success:function(res){
        resolve(res);
      },
      success:function(err){
        reject(err)
      }
    })
  })
}
Page({
  onLoad: function (options) {
    var searchKey = encodeURI('美女');
    // var ss = fetch(`https://v.juhe.cn/dream/query?key=a3bad6b379879791d5de72c98ea9e88d&q=${searchKey}`)
    fetch(`https://v.juhe.cn/dream/query?key=a3bad6b379879791d5de72c98ea9e88d&q=${searchKey}`)
    console.log(ss)//ss是promise对象
    // ss.then(res => {
    .then(res => {
      console.log(res, '成功了')
    }).catch(err => {
      console.log(res, '请求出错')
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})