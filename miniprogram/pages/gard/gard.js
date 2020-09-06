// pages/gard/gard.js
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
    wx.cloud.database().collection('ylmsg').get({
      success: res => {
        this.setData({
          ylmsg: res.data
        })
      }
    })
  },
  ads(){
    wx.chooseLocation({
      success: function(res) {
        wx.openLocation({
          latitude: res.latitude,
          longitude: res.longitude,
          name:res.address
        })
      },
    })
  },
  tel(e){
    let phone = e.currentTarget.dataset.phone
    wx.makePhoneCall({
      phoneNumber: phone,
      success: res => {
        console.log('拨打电话成功')
      },
      fail: err => {
        console.log('拨打电话失败')
      }
    })
  }
})