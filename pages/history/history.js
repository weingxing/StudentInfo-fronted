// pages/history/history.js
const app = getApp()
import api from "../../utils/api.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result: [],
    haveInfo: false,
    notHaveInfo: true
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
    const that = this;

        wx.showModal({
          title: '功能开发中',
          content: '该功能正在开发中，暂时不可使用',
          showCancel: false,
          success: function (res) {
            //弹窗成功的回调函数

          }
        })
    // wx.request({
    //   url: api.history,
    //   data: {
    //     openid: app.globalData.openid
    //   },
    //   success(res){
    //     // 请求历史记录接口成功回调函数
    //     that.setData({result: res.data})

    //     // 确保数据请求完成
    //     wx.showLoading({
    //       title: '加载中',
    //     })
    //     setTimeout(function () {
    //       wx.hideLoading()
    //       if (that.data.result == null || that.data.result == "") {
    //         that.setData({
    //           haveInfo: false,
    //           notHaveInfo: true
    //         });
    //       } else {
    //         that.setData({
    //           haveInfo: true,
    //           notHaveInfo: false
    //         })
    //       }
    //     }, 1000)
    //   },
    //   fail(res) {
    //     // 请求历史记录接口失败回调函数
    //     wx.showModal({
    //       title: '请求失败',
    //       content: '请检查网络连接',
    //       showCancel: false,
    //       success: function (res) {
    //         //弹窗成功的回调函数

    //       }
    //     })
    //   }
    // })
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