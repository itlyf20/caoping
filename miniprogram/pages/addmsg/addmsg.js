Page({
  data: {
    
  },
  addcp(){
    var openid
    wx.cloud.database().collection("cpmsg").get({
      success: res => {
        let datas = res.data;
        for (var i = 0; i < datas.length; i++) {
          openid = datas[i]._openid;
        }
        if (openid == null) {
          wx.showModal({
            title: '提示',
            content: '你还未注册草坪商家',
          })
          return
        } else {
          wx.navigateTo({
            url: '../../pages/addcp/addcp',
          })
        }
      }
    })
  },
  addyl(){
    var openid
    wx.cloud.database().collection("ylmsg").get({
      success: res => {
        let datas = res.data;
        for (var i = 0; i < datas.length; i++) {
          openid = datas[i]._openid;
        }
        if (openid == null) {
          wx.showModal({
            title: '提示',
            content: '你还未注册园林商家',
          })
          return
        } else {
          wx.navigateTo({
            url: '../../pages/addyl/addyl',
          })
        }
      }
    })
  }
 
})