// pages/user/user.js
const app = getApp()
import api from "../../utils/api.js"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hasUserInfo: false,
    userInfo: null
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
    if (app.globalData.userInfo != null) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
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

  getUserInfo: function (e) {
    // 获取用户信息
    if (e.detail.userInfo != undefined) {
      // 获得用户授权
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
      app.globalData.userInfo = e.detail.userInfo
    }

    if(this.data.hasUserInfo && !app.globalData.access) {
      wx.navigateTo({
        url: '../bind/bind',
      })
    }
  },

  share: function (e) {
    wx.navigateTo({
      url: '../share/share',
    })
  },

  history: function (e) {
    // wx.navigateTo({
    //   url: '../history/history',
    // })

    wx.showModal({
      title: '功能开发中',
      content: '该功能正在完善中',
      showCancel: false,
      success: function (res) {
        //弹窗成功的回调函数

      }
    })
  },

  about: function (e) {
    wx.showModal({
      title: '关于',
      content: '学生信息管理 Version 0.1.1',
      showCancel: false,
      success: function (res) {
        //弹窗成功的回调函数

      }
    })
  }
})
