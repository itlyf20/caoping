// miniprogram/pages/ylmsg/ylmsg.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ylmsg:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.database().collection("addyl").where({
      _openid: options.openid
    }).get({
      success: res => {
        this.setData({
          ylmsg: res.data
        })
      }
    })
  },
})