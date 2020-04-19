// pages/detail/detail.js
const app = getApp();
import api from "../../utils/api.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {},
    sid: null,
    sname: null,
    sex: null,
    className: null,
    collegeName: null,
    majorName: null,
    categoryName: null,
    photo: null,
    phone: null,
    idcard: null,
    address: null,
    remark: null,
    describe: null,

    inEdit: false,  // 判断编辑备注的标志位
    notInEdit: true, // 判断编辑备注的标志位
    note: null,

    show: false,  // 判断弹出层的标志位
    notPopUp: true,  // 判断弹出层的标志位

    status: null  // 同全局变量status
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
    this.setData({ status: app.globalData.status });
    // console.log(this.data.status);
    // 取出本地数据
    this.setData({ info: wx.getStorageSync("click") });
    // console.log(this.data.info);
    // 解析读取数据
    this.setData({
      sid: this.data.info.sid,
      sname: this.data.info.sname,
      sex: this.data.info.sex,
      className: this.data.info.classname,
      collegeName: this.data.info.collegename,
      majorName: this.data.info.majorname,
      categoryName: this.data.info.categoryname,
      photo: this.data.info.photo,
      phone: this.data.info.phone,
      idcard: this.data.info.idcard,
      address: this.data.info.address,
      remark: this.data.info.remark,
      describe: this.data.info.describe
    });
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

  getNewRemark: function(e) {
    this.setData({ note: e.detail });
  },

  editRemark: function(e) {
    this.setData({
      notInEdit: false,
      inEdit: true
    });
  },

  updateRemark: function(e) {
    var that = this
    // 请求接口，更新后台数据
    if (this.data.note == null) {
      wx.showToast({
        title: '未改动备注',
        icon: 'none'
      });
    } else {
      wx.request({
        url: api.updateRemark,
        method: "POST",
        data: {
          sno: this.data.sid,
          remark: this.data.note,
          openid: app.globalData.openid
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success(res) {
          //更改备注成功回调函数
          if(res.statusCode == '200') {
            var tmp = that.data.note
          
            // 确保网络请求及本地数据更新完成
            wx.showLoading({
              title: '提交中',
            });
            setTimeout(function () {
              // 更改本地缓存数据
              var arr = app.globalData.resultSet;
              var i = 0;
              for(i = 0; i < arr.length; i++) {
                if(arr[i].sid == that.data.sid) {
                  arr[i].remark = tmp;
                }
                else continue;
              }

              // 更改本页面数据
              that.setData({
                notInEdit: true,
                inEdit: false,
                remark: tmp
              });
              wx.hideLoading()
              wx.showToast({
                title: '修改成功',
                icon: 'none'
              });
            }, 200);
          } else {
            wx.showToast({
              title: '修改失败',
              icon: 'none'
            });
          }
        },
        fail(res) {
          //更改备注失败回调函数
          wx.showToast({
            title: '网络错误，请重试',
            icon: 'none'
          });
        }
      });
    }
  },

  // 拨打电话
  phoneCall: function(e) {
    wx.makePhoneCall({
      phoneNumber:  this.data.phone
    });
  },

  // 复制身份证号
  copyIdcard: function(e) {
    wx.setClipboardData({
      data: this.data.idcard,
      success(res) {
        wx.getClipboardData({
          success(res) {
            
          }
        });
      }
    });
  },

  // 复制地址
  copyAddress: function (e) {
    wx.setClipboardData({
      data: this.data.address,
      success(res) {
        wx.getClipboardData({
          success(res) {
           
          }
        });
      }
    });
  },

  // 点击查看图片
  previewImg: function (e) {
    var imgArr = [this.data.photo];
    wx.previewImage({
      current: imgArr[0],
      urls: imgArr,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { }
    });
  },

  // 取消编辑备注
  cancelUpdateRemark: function(e) {
    this.setData({
      notInEdit: true,
      inEdit: false
    });
  },

  // 显示弹出层
  answer: function(e) {
    var that = this;
    that.setData({
      notPopUp: false,
      show: true
    });
  },
  
  // 弹出层关闭
  onClose() {
    var that = this;
    this.setData({ show: false });
    setTimeout(function () { 
        that.setData({ notPopUp: true });
      }, 300);
  },

  move: function(e) {

  }
})
