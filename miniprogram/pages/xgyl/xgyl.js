Page({
  data: {

  },
  onLoad: function (options) {
    wx.cloud.database().collection("addyl").where({
      _id:options.id
    }).get({
      success:res=>{
        this.setData({
          yl:res.data
        })
      }
    })
  },
  imgs(){
    wx.showToast({
      title: '图片暂时不能修改，或者选择删除后重新添加',
      icon:"none"
    })
  },

  //修改园林
  spname(e){
    this.setData({
      spname:e.detail.value
    })
  },
  spprice(e) {
    this.setData({
      spprice: e.detail.value
    })
  },
  updgard(e){
    let id = e.currentTarget.dataset.id 
    wx.cloud.database().collection("addyl").doc(id).update({
      data:{
        spname:this.data.spname,
        spprice:this.data.spprice
      },
    })
    .then(res=>{
      wx.showToast({
        title: '修改成功',
      })
    }).catch(err=>{
      wx.showToast({
        title: '修改失败',
        icon:"none"
      })
    })
  }
})