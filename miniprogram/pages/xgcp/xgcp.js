Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  addPic1(){
    wx.showToast({
      title: '图片暂时不能修改，或者选择删除后重新添加',
      icon:"none"
    })
  },
  onLoad: function (options) {
      wx.cloud.database().collection("addcp").where({
        _id:options.id
      }).get({
        success:res=>{
          this.setData({
            cp: res.data
          })
        }
      })
  },
  cpname(e){
    this.setData({
      cpname:e.detail.value
    })
  },
  cpads(e) {
    this.setData({
      cpads: e.detail.value
    })
  },
  cpprice(e) {
    this.setData({
      cpprice: e.detail.value
    })
  },
  cpmsg(e) {
    this.setData({
      cpmsg: e.detail.value
    })
  },
  //修改功能
  updsward(e){
    let id = e.currentTarget.dataset.id
    wx.cloud.database().collection("addcp").doc(id).update({
      data:{
        cpname:this.data.cpname,
        cpads:this.data.cpads,
        cpmsg:this.data.cpmsg,
        cpprice:this.data.cpprice
      },
    })
    .then(res=>{
      wx.showToast({
        title: '修改成功',
      })
    })
    .catch(err=>{
      wx.showToast({
        title: '修改失败',
        icon:"none"
      })
    })
  }
})