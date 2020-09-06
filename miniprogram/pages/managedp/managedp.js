Page({
  data: {  
  },

  //草坪店铺
  cp(){
    var openid
    wx.cloud.callFunction({
      name:"cplogin",
      success:res=>{
        openid=res.result.openid
        if (openid == "") {
          wx.showModal({
            title: '提示',
            content: '你还未添加草坪信息',
          })
          return
        } else {
          wx.navigateTo({
            url: '../../pages/xgsward/xgsward?id=' + openid,
          })
        }
      }
    })
  },

//园林店铺
  ylmsg(){
    var openid
    wx.cloud.callFunction({
      name:"cplogin",
      success:res=>{
        openid=res.result.openid
        if (openid == "") {
          wx.showModal({
            title: '提示',
            content: '你还未添加园林信息',
          })
        } else {
          wx.navigateTo({
            url: '../../pages/xggard/xggard?ids=' + openid,
          })
        }
      }
    })
  }
})