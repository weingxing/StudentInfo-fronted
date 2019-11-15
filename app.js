//app.js
import api from "/utils/api.js"

App({
  onLaunch: function () {
    // 登录
    var that = this
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: api.login,
          data: {
            code: res.code
          },
          success: function (result) {
            // 调用登录接口成功回调函数
            if (result.data) {
              that.globalData.openid = result.data;
            }

            //根据openid确定是否已绑定工号
            // 弹窗提示，确保完成网络请求
            wx.showLoading({
              title: '正在鉴权',
            })

            wx.request({
              url: api.access,
              data: {
                openid: that.globalData.openid
              },
              success: function (res) {
                //请求确定接口成功回调函数
                that.globalData.access = res.data
              },
              fail: function () {
                //请求确定权限接口失败回调函数
                wx.showModal({
                  title: '请求失败',
                  content: '请检查网络连接',
                  showCancel: false,
                  success: function (res) {
                    //弹窗成功的回调函数

                  }
                })
              }
            })

            setTimeout(function() {wx.hideLoading()}, 600)
          },
          fail: res => {
            // 调用登录接口换取openid失败回调函数
            wx.showModal({
              title: '请求失败',
              content: '请检查网络连接',
              showCancel: false,
              success: function (res) {
                //弹窗成功的回调函数

              }
            })
          }
        })
      },
      fail: res => {
        // 登录失败回调函数
        wx.showModal({
          title: '登陆失败',
          content: '请稍后重试',
          showCancel: false,
          success: function (res) {
            //弹窗成功的回调函数

          }
        })
      }
    })

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // res 发送给后台解码出 unionId
              // console.log(res.userInfo)
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，请求结果可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    openid: null,
    access: false,
    resultSet: [],
    select: null,
    token: null,
    keyword: null
  }
})