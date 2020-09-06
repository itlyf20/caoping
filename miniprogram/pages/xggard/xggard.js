// miniprogram/pages/xggard/xggard.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  onLoad: function (options) {
    wx.cloud.database().collection("addyl").where({
      _openid: options.ids
    }).get({
      success: res => {
        this.setData({
          yl: res.data
        })
      }
    })
  },
  delyl(e){
    let id = e.currentTarget.dataset.id
    wx.cloud.database().collection("addyl").doc(id).remove({
      success: res => {
        wx.showToast({
          title: '删除成功',
        })
        onLoad(options)//删除成功重新加载
      }, fail: err => {
        wx.showToast({
          title: '删除失败',
          icon:"none"
        })
      }
    })
  },
  updyl(e){
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../../pages/xgyl/xgyl?id='+id,
    })
  }
})