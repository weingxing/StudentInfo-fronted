// pages/share/share.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  onShareAppMessage: function (e) {
    var that = this;
    return {
      title: '学生信息管理',
      path: 'pages/index/index',
      imageUrl: "/images/er_code.jpg",
      success: function (res) {
        console.log("分享成功:" + JSON.stringify(res));
        var shareTickets = res.shareTickets;
      },
      fail: function (res) {
        console.log("分享失败:" + JSON.stringify(res));
      }
    }
  },
  
  // 保存图片到相册
  save: function (e) {
    wx.saveImageToPhotosAlbum({
      filePath: "/images/er_code.jpg",
      success(res) {
        console.log(res);
        wx.showToast({
          title: '保存成功',
          icon: 'success',
          duration: 2000
        });
      }
    });
  }
});