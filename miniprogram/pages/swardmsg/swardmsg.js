Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
  onLoad(options){
    wx.cloud.database().collection("addcp").where({
      _openid:options.openid
    }).get({
      success:res=>{
        console.log(JSON.stringify(res.data));//吧复制到文本文件中数据
        this.setData({
          cp:res.data
        })
      }
    })
  },
  addres: function () {
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
  ads: function () {
    wx.chooseLocation({
      success: function (res) {
        wx.openLocation({
          latitude: res.latitude,
          longitude: res.longitude,
          name: res.address
        })
      },
    })
  },
tel(){
  let phone=this.data.phone
  wx.makePhoneCall({
    phoneNumber: phone,
    success:res=>{
      console.log('拨打电话成功')
    },
    fail:err=>{
      console.log('拨打电话失败')
    }
  })
}
})