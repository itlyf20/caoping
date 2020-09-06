var db = wx.cloud.database()
Page({
  data: {
    serch:[]
  },
  serchinput(e){this.setData({serchs:e.detail.value})},
  serch(){
    let serchs=this.data.serchs
    // 数据库正则对象
    db.collection('addcp').where({
      cpname:serchs
    }).get({
      success:res=>{
        console.log(res.data)
        this.setData({
          serch:res.data
        })
      }
    })
  }

})