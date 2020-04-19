//app.js
import api from "/utils/api.js"

App({
  onLaunch: function () {
    // 登录
    var that = this;
    //根据openid确定是否已绑定工号
    // 弹窗提示，确保完成网络请求
    wx.showLoading({
      title: '正在鉴权',
    });

    // 检测当前的状态，隐藏部分内容
    wx.request({
      url: api.getStatus,
      success: function (res) {
        if (res.data.content === 1)
          that.globalData.status = true;
        else
          that.globalData.status = false;
        
      }
    });

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
              that.globalData.openid = result.data.content;
            }

            wx.request({
              url: api.access,
              data: {
                openid: that.globalData.openid
              },
              success: function (res) {
                //请求确定接口成功回调函数
                // console.log(res.data);
                that.globalData.access = res.data.content;
                setTimeout(function () { wx.hideLoading() }, 1500);
              },
              fail: function () {
                //请求确定权限接口失败回调函数
                setTimeout(function () { wx.hideLoading() }, 1500);
                wx.showModal({
                  title: '请求失败',
                  content: '请检查网络连接',
                  showCancel: false,
                  success: function (res) {
                    //弹窗成功的回调函数

                  }
                });
              }
            });
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
            });
          }
        });
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
        });
      }
    });

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // res 发送给后台解码出 unionId
              // console.log(res.userInfo);
              this.globalData.userInfo = res.userInfo;

              // 由于 getUserInfo 是网络请求，请求结果可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res);
              }
            }
          });
        }
      }
    });
  },
  
  // 全局变量
  globalData: {
    userInfo: null,  // 用户信息
    openid: null,  // openid
    access: false,  // 是否有权限访问
    resultSet: [],  // 结果
    select: null,  // 选择的年级
    token: null,  // 用于判断跳转到list页面后要请求哪个接口
    keyword: null,  // 搜索关键词
    status: null  // 显示/隐藏状态
  }
});