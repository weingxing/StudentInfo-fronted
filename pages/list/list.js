// pages/list/list.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result: [],
    haveInfo: true,
    notHaveInfo: false
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
    var result = app.globalData.resultSet
    this.setData({ result: result })
    // 检查是否查询到信息
    if (this.data.result == null || this.data.result == "") {
      // 没有查询到信息
      this.setData({
        // 存在信息
        haveInfo: false,
        // 不存在信息
        notHaveInfo: true
      });
    } else {
      //查询到信息
      this.setData({
        // 存在信息
        haveInfo: true,
        // 不存在信息
        notHaveInfo: false
      })
    }
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

  },
   
  detail: function (evt) {
    // 将信息持久化存储到本地，供下一页面使用
    wx.setStorageSync("click", evt.currentTarget.dataset)

    // 延时跳转，确保存储完成
    wx.showLoading({
      title: '加载中',
    })
   
    setTimeout(function () {
      wx.hideLoading()
      wx.navigateTo({
        url: '../detail/detail',
      })
    }, 500)
  }
})