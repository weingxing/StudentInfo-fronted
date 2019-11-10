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

  // 搜索
  search: function() {
    var that = this;
    //检查是否登录
    if (app.globalData.userInfo == null) {
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
    } else if (this.data.keyword != null) {
      // 有权限访问数据，请求搜索接口
      if (app.globalData.access) {
        //获取到输入的文字，请求搜索接口
        wx.request({
          url: api.search,
          data: {
            keyword: this.data.keyword,
            openid: app.globalData.openid
          },
          success(res) {
            // 搜索成功回调函数
            if (res.statusCode == '200') {
              // 返回的数据保存到全局变量，供下一页面使用
              app.globalData.resultSet = res.data;

              // 弹出加载中提示框，延时跳转页面，确保网络请求完成
              wx.showLoading({
                title: '加载中',
              })
              setTimeout(function () {
                wx.hideLoading()
                wx.navigateTo({
                  url: '../list/list',
                })
              }, 1000)
            } else {
              // 服务器返回码非200
              wx.showToast({
                title: '发生错误，请联系管理员',
                icon: 'none'
              })
            }
          },
          fail(err) {
            // 发起网络请求失败回调函数（搜索接口）
            console.log("请求错误" + err);
            wx.showToast({
              title: '网络错误，请重试',
              icon: 'none'
            })
          }
        })
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
    } else {
      if(app.globalData.access) {
        wx.request({
          url: api.getAllInfo,
          data: {
            openid: app.globalData.openid
          },
          success(res) {
            if (res.statusCode == '200') {
              // 返回的数据保存到全局变量，供下一页面使用
              app.globalData.resultSet = res.data;

              // 弹出加载中提示框，延时跳转页面，确保网络请求完成
              wx.showLoading({
                title: '加载中',
              })
              setTimeout(function () {
                wx.hideLoading()
                wx.navigateTo({
                  url: '../list/list',
                })
              }, 1000)
            }
          },
          fail(err) {
            // 发起网络请求失败回调函数（搜索接口）
            console.log("请求错误" + err);
            wx.showToast({
              title: '网络错误，请重试',
              icon: 'none'
            })
          }
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
    } else {
      if(app.globalData.access) {
        wx.request({
          url: api.getSpecialInfo,
          data: {
            openid: app.globalData.openid,
          },
          success(res) {
            if (res.statusCode == '200') {
              // 返回的数据保存到全局变量，供下一页面使用
              app.globalData.resultSet = res.data;

              // 弹出加载中提示框，延时跳转页面，确保网络请求完成
              wx.showLoading({
                title: '加载中',
              })
              setTimeout(function () {
                wx.hideLoading()
                wx.navigateTo({
                  url: '../list/list',
                })
              }, 1000)
            }
          },
          fail(err) {
            // 发起网络请求失败回调函数（搜索接口）
            console.log("请求错误" + err);
            wx.showToast({
              title: '网络错误，请重试',
              icon: 'none'
            })
          }
        })
      } else {
        wx.navigateTo({
          url: '../bind/bind',
        })
      }
    }
  }
})
