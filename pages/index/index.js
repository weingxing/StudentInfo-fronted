//index.js
import api from "../../utils/api.js"
const app = getApp()

Page({
  data: {
    keyword: null,
    value: null
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
    this.setData({ value: null })
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

  // 获取输入
  getKeyword: function(e) {
    var keyword = e.detail
    this.setData({ keyword: keyword });
  },

  // 登录提示
  showLoginTip: function () {
    wx.showToast({
      title: '请登录',
      icon: 'none',
      success(res) {
        // 弹窗成功，延时跳转到用户界面引导登录
        setTimeout(function (e) {
          wx.switchTab({
            url: '../user/user'
          })
        }, 500, res)
      }
    })
  },
  
  // 搜索
  search: function() {
    var that = this;
    //检查是否登录
    if (app.globalData.userInfo == null) {
      this.showLoginTip();

    } else if (this.data.keyword != null) {
      // 有权限访问数据，请求搜索接口
      if (app.globalData.access) {
        wx.showLoading({
          title: '加载中',
        });
        app.globalData.token = "search";
        app.globalData.keyword = this.data.keyword
        setTimeout(function() {
          wx.hideLoading();
          wx.navigateTo({
            url: '../list/list',
          });
        }, 500)
      } else {
        wx.navigateTo({
          url: '../bind/bind',
        })
      }
    } else if (this.data.keyword == null) {
      // 未获取到输入
      wx.showToast({
        title: '请输入关键词',
        icon: 'none'
      })
    }
  },

  getAllInfo: function(e) {
    //检查是否登录
    if (app.globalData.userInfo == null) {
      this.showLoginTip();

    } else {
      if(app.globalData.access) {
        app.globalData.select = "grade"
        wx.navigateTo({
          url: '../select/select',
        })
      } else {
        wx.navigateTo({
          url: '../bind/bind',
        })
      }
    }
  },

  getSpecialInfo: function(e) {
    //检查是否登录
    if (app.globalData.userInfo == null) {
      this.showLoginTip();
    } else {
      if(app.globalData.access) {
        app.globalData.select = "category"
        wx.navigateTo({
          url: '../select/select',
        })
      } else {
        wx.navigateTo({
          url: '../bind/bind',
        })
      }
    }
  }
})
