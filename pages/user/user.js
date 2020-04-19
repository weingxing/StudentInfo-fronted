// pages/user/user.js
const app = getApp();
import api from "../../utils/api.js";
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
      });
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
      });
      app.globalData.userInfo = e.detail.userInfo
    }

    // 用户没有绑定工号
    if(this.data.hasUserInfo && !app.globalData.access) {
      wx.navigateTo({
        url: '../bind/bind',
      });
    }
  },
  
  share: function (e) {
    wx.navigateTo({
      url: '../share/share',
    });
  },

  myclass: function (e) {



    var that = this;
    //检查是否登录
    if (app.globalData.userInfo == null) {
      wx.showToast({
        title: '请登录',
        icon: 'none',
        success(res) {
          // 回调函数

        }
      });
    } else {
      // 如果有权限访问数据，跳转页面请求数据
      if (app.globalData.access) {
        wx.showLoading({
          title: '加载中',
        });
        app.globalData.token = "myclass";
        setTimeout(function () {
          wx.hideLoading();
          wx.navigateTo({
            url: '../list/list',
          });
        }, 500);
      } else {
        wx.navigateTo({
          url: '../bind/bind',
        });
      }
    }
  },

  about: function (e) {
    wx.showModal({
      title: '关于',
      content: '学生信息管理 Version 0.3.0',
      showCancel: false,
      success: function (res) {
        //弹窗成功的回调函数

      }
    });
  }
});
