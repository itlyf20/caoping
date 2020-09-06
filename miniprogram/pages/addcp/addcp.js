Page({
  data: {
    imgbox: '',
    cpname:'',
    cpads:'',
    cpprice:'',
    cpmsg:'',
    imgUrl:''
  },
  //获取图片
  addPic1: function (e) {
    var imgbox = this.data.imgbox;
    var that = this;
    var n = 4;
    if (4 > imgbox.length > 0) {
      n = 4- imgbox.length;
    } else if (imgbox.length == 4) {
      n = 1;
    }

    let path = [];
    wx.chooseImage({
      count: n, // 默认9，设置图片张数
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        if (imgbox.length == 0) {
          imgbox = tempFilePaths
        } else if (4 > imgbox.length) {
          console.log(tempFilePaths+"图片路径");//这里因该有多个路径，现在只有一个
          imgbox = imgbox.concat(tempFilePaths);
        }
        that.setData({
          imgbox: imgbox
        });
        path.push(res.tempFilePaths[0]);
        for (let i = 0; i < path.length; i++) {
          console.log(path.length + "图片大小");
          wx.cloud.uploadFile({
            cloudPath: new Date().getTime() + '.png',//试一下
            filePath: res.tempFilePaths[i], // 文件路径
            success: res => {
              that.setData({
                imgUrl: res.fileID
              })
            }
          })
        }
      }
    })
  },
  //图片
  imgbox: function (e) {this.setData({imgbox: e.detail.value})},
  //草坪名称
  cpname(e) { this.setData({ cpname: e.detail.value })},
  //草坪地址
  cpads(e) { this.setData({ cpads: e.detail.value }) },
  //草坪价格
  cpprice(e) { this.setData({ cpprice: e.detail.value }) },
  //草坪介绍
  cpmsg(e) { this.setData({ cpmsg:e.detail.value})},
  // 删除照片
  imgDelete1: function (e) {
    let that = this;
    let index = e.currentTarget.dataset.deindex;
    let imgbox = this.data.imgbox;
    imgbox.splice(index, 1)
    that.setData({
      imgbox: imgbox
    });
  },
  //表单提交
  add(){
    let cpname=this.data.cpname
    let cpads=this.data.cpads
    let cpprice=this.data.cpprice
    let cpmsg=this.data.cpmsg
    let imgbox=this.data.imgbox
    if(cpname==''){
      wx.showToast({
        title: '草坪名称不能为空',
        icon:'none'
      })
      return
    }else if(cpads==''){
      wx.showToast({
        title: '草坪地址不能为空',
        icon: 'none'
      })
      return
    }else if(cpprice==''){
      wx.showToast({
        title: '请输入你的草坪价格',
      })
      return
    }else if(cpmsg==''){
      wx.showToast({
        title: '请输入你的草坪信息',
        icon:'none'
      })
      return
    }else if(imgbox==''){
      wx.showToast({
        title: '请上传你的草坪图片',
        icon:'none'
      })
      return
    }
    wx.cloud.database().collection('addcp').add({
      data:{
        cpname:cpname,
        cpads:cpads,
        cpprice:cpprice,
        cpmsg:cpmsg,
        imgbox:imgbox,
        imgUrl:this.data.imgUrl
      }
    }).then(res=>{
      wx.showToast({
        title: '添加成功',
      })
    }).catch(err=>{
      console.log(err)
    })
  }
})//你在我点的那个括号外打印