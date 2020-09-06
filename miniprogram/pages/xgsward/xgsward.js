Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  onLoad(options){
   wx.cloud.database().collection("addcp").where({
     _openid: options.id
   }).get({
     success:res=>{
       this.setData({
         cp:res.data
       })
     }
   })
  },

  delsward(e){
    let id = e.currentTarget.dataset.id
    const db = wx.cloud.database();
    db.collection("addcp").doc(id).remove({
      success: res => {
        wx.showToast({
          title: '删除成功',
        })
        onLoad(options)//删除成功重新加载
      }, fail: err => {
        wx.showToast({
          title: '删除失败',
        })
      }
    })
  },
  updsward(e){
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../../pages/xgcp/xgcp?id='+id,
    })
  }
})