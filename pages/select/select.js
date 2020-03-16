// pages/select/select.js
// 特殊学生

const app = getApp();
import api from "../../utils/api.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    result: [],
    haveInfo: true,
    notHaveInfo: false,
    select: null
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
    const that = this
    wx.showLoading({
      title: '加载中'
    });
    var tmpToken = app.globalData.select
    this.setData({select: tmpToken})
    if (tmpToken == "grade") {
      wx.request({
        url: api.getAllGrade,
        success(res) {
          if(res.statusCode == 200) {
            that.setData({
              result: res.data.content,
              haveInfo: true,
              notHaveInfo: false
            });
          } else {
            wx.showToast({
              title: '服务器错误',
              icon: 'none'
            });
          }
        }
      });
    } else if(tmpToken == "category") {
      this.setData({
        result: ["经济困难", "学习困难", "身体缺陷", "心理问题", "家庭变故", "优秀学生"],
        haveInfo: true,
        notHaveInfo: false
      });
    }

    setTimeout(function () {
      wx.hideLoading()
    }, 500);
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

  open: function(e) {
    // console.log(e.currentTarget.dataset.category)
    app.globalData.keyword = e.currentTarget.dataset.category
    app.globalData.token = this.data.select
    // console.log(app.globalData.token)
    
    wx.navigateTo({
      url: '../list/list',
    });
  }
});