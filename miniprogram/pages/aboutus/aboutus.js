// pages/aboutus/aboutus.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  tel(){
    wx.makePhoneCall({
      phoneNumber: '18679185798',
      success: res => {
        console.log('拨打电话成功')
      },
      fail: err => {
        console.log('拨打电话失败')
      }
    })
  }
})