// pages/leavingmsg/leavingmsg.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fankui:''
  },
  fankui(e){
    this.setData({
      fankui: e.detail.value
    })
  },
  tijiao(res){
    let fankui=this.data.fankui
    if(fankui==""){
      wx.showToast({
        title: '内容不能为空',
        icon:"none"
      })
      return 
    }else{
      wx.cloud.database().collection('fankui').add({
        data: {
          fankui: fankui
        }
      }).then(res => {
        wx.showModal({
          title: '提示',
          content: '感谢你的反馈，我们将做的更好',
        })
      }).catch(err => {
        console.log(err)
      })  
    }
  }
})