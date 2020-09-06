var app = getApp()
Page({
  data: {
    userInfo:[]
  },
  onLoad: function () {
      wx.getUserInfo({
        success:res=>{
          this.setData({
            userInfo: res.userInfo
          })
        }
      })
  }
})