Page({

  data: {
    cpmsg:[]
  },
  onLoad(){
   wx.cloud.database().collection("cpmsg").get({
     success:res=>{
        this.setData({
          cpmsg:res.data
        })
     }
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
  },
  address(){
    wx.chooseLocation({
      success: function(res) {
        wx.openLocation({
          latitude: res.latitude,
          longitude: res.longitude,
          name:res.address
        })
      },
    })
  }
})