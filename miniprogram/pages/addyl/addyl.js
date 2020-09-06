var img
var imgUrl
Page({
  data: {
    img:'',
    spname:'',
    spprice:'',
    imgUrl
  },
  //商品名称
  spname(e){this.setData({spname:e.detail.value})},
  //商品价格
  spprice(e) { this.setData({ spprice: e.detail.value })},
  imgbtn(){
    var that=this
    wx.chooseImage({
      success: function(res) {
        wx.showToast({
          title: '上传成功',
        }),
        that.setData({
          img:res.tempFilePaths
        })
        wx.cloud.uploadFile({
          cloudPath: new Date().getTime() + '.png',
          filePath: res.tempFilePaths[0], // 文件路径
          success: res => {
            that.setData({
              imgUrl: res.fileID
            })
          }
        })
      },
    })
  },
  //表单提交
  addsp(){
    let spname=this.data.spname
    let spprice=this.data.spprice
    let img=this.data.img
    let imgUrl=this.data.imgUrl
    console.log(imgUrl)
    if(spname==''){
      wx.showToast({
        title: '请输入你的商品名称',
        icon:'none'
      })
      return 
    }if(spprice==''){
      wx.showToast({
        title: '请输入你的商品价格',
        icon:'none'
      })
      return 
    }if(img==''){
      wx.showToast({
        title: '请上传你的商品图片',
        icon:'none'
      })
    }
    wx.cloud.database().collection('addyl').add({
      data:{
        spname:spname,
        spprice:spprice,
        img:img,
        imgUrl:this.data.imgUrl,
      }
    }).then(res=>{
      wx.showToast({
        title: '添加成功',
      })
    }).catch(err=>{
      console.log(err)
    })
  }
})