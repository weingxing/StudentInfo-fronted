// pages/listAll/listAll.js
const app = getApp();
import api from "../../utils/api.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    result: [],
    token: null,  // 判断请求哪个接口
    keyword: null,

    haveInfo: true,
    notHaveInfo: false,

    pageIndex: 1,
    pageSize: 30,  // 分页大小
    count: 1,
    // 标志是否还有更多信息（是否要显示 没有更多信息 提示）
    haveMore: true,
    notHaveMore: false
  },

  
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  // 分页获取信息
  getDate: function() {
    var that = this;
    // 上级页面是index（搜索）或 select（特殊学生）
    if (this.data.token == "search" || this.data.token == "category") {
      // 请求接口，取得数据
      wx.request({
        url: api.search,
        data: {
          page: this.data.pageIndex,
          limit: this.data.pageSize,
          keyword: this.data.keyword,
          openid: app.globalData.openid
        },
        success: function (res) {
          // console.log("获取的数据信息", res.data);
          if (res.statusCode == 200) {
            // 请求成功
            var tempList = res.data.data;
            that.setData({
              count: res.data.count,
              result: that.data.result.concat(tempList)
            });
          } else {
            wx.showToast({
              title: '网络错误',
              icon: 'none'
            });
          }
        },
        fail: function (error) {
          wx.showToast({
            title: '发起网络请求失败',
            icon: 'none'
          });
        }
      });
    } 
    // 上级页面是全部学生（select）
    else if (this.data.token == "grade") {
      wx.request({
        url: api.getInfoByGrade,
        data: {
          page: this.data.pageIndex,
          limit: this.data.pageSize,
          grade: this.data.keyword,
          openid: app.globalData.openid
        },
        success: function (res) {
          // console.log(" 获取的数据信息", res.data);
          if (res.statusCode == 200) {
            // 请求成功
            var tempList = res.data.data;
            var tempPageCount = res.data.count;
            that.setData({
              count: tempPageCount,
              result: that.data.result.concat(tempList)
            });
          } else {
            wx.showToast({
              title: '网络错误',
              icon: 'none'
            });
          }
        },
        fail: function (error) {
          wx.showToast({
            title: '发起网络请求失败',
            icon: 'none'
          });
        }
      });
    } 
    // 上级页面是我的班级（mine）
    else if (this.data.token == "myclass") {
      wx.request({
        url: api.getMyClassInfo,
        data: {
          page: this.data.pageIndex,
          limit: this.data.pageSize,
          openid: app.globalData.openid
        },
        success: function (res) {
          if (res.statusCode == 200) {
            // 请求成功
            var tempList = res.data.data;
            var tempPageCount = res.data.count;
            that.setData({
              count: tempPageCount,
              result: that.data.result.concat(tempList)
            });
          } else {
            wx.showToast({
              title: '网络错误',
              icon: 'none'
            });
          }
        },
        fail: function (error) {
          wx.showToast({
            title: '发起网络请求失败',
            icon: 'none'
          });
        }
      });
    }
  },

  sleep: function(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this;
    this.setData({
      token: app.globalData.token,
      keyword: app.globalData.keyword
    });

    this.getDate();

    wx.showLoading({
      title: '加载中',
    });

    this.sleep(500).then(() => {
      console.log(that.data.result.length);
      if (that.data.result.length > 0) {
        that.setData({
          haveInfo: true,
          notHaveInfo: false
        });
      } else {
        that.setData({
          haveInfo: false,
          notHaveInfo: true
        });
      }
    });
    
    setTimeout(function(){
      wx.hideLoading();

      if(Math.ceil(that.data.count/that.data.pageSize) == that.data.pageIndex) {
        that.setData({
          haveMore: false,
          notHaveMore: true
        });
      }
    }, 1000);
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
    if (this.data.pageIndex < Math.ceil(this.data.count / this.data.pageSize)) {
      this.data.pageIndex++;
      this.getDate();
    } else {
      this.setData({
        haveMore: false,
        notHaveMore: true
      });
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
   
  // 查看详细信息
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
    }, 500);
  }
});