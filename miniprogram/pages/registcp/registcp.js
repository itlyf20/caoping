var imgbox
Page({
  data: {
      imgbox:'',
      imgbox1:"",
      imgbox2:"",
      phone:"",
      idcard:"",
      cpaddress:"",
      name:'',
      gongsi:''
  },
  phone(e){this.setData({phone:e.detail.value})},
  idcard(e) {this.setData({idcard: e.detail.value})},
  cpaddress(e) {this.setData({cpaddress: e.detail.value})},
  name(e) { this.setData({ name: e.detail.value }) },
  gongsi(e) { this.setData({ gongsi: e.detail.value }) },
  sfz1: function () {
    var that = this
    wx.chooseImage({
      success: function (res) {
        wx.showToast({
          title: '上传成功',
        })
        that.setData({
          imgbox: res.tempFilePaths
        });
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
      fail: res => {
        console.log(res)
      }
    })

  },
  sfz2:function(){
    var that = this
    wx.chooseImage({
      success: function (res) {
        wx.showToast({
          title: '上传成功',
        })
        that.setData({
          imgbox1: res.tempFilePaths
        });
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
      fail: res => {
        console.log(res)
      }
    })
  },
  sfz3: function () {
    var that = this
    wx.chooseImage({
      success: function (res) {
        wx.showToast({
          title: '上传成功',
        })
        that.setData({
          imgbox2: res.tempFilePaths
        });
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
      fail: res => {
        console.log(res)
      }
    })
  },
  regist:function(e){
    let phone=this.data.phone
    let idcard = this.data.idcard
    let cpaddress = this.data.cpaddress
    let name = this.data.name
    let gongsi = this.data.gongsi
    let imgbox = this.data.imgbox
    let imgbox1 = this.data.imgbox1
    let imgbox2 = this.data.imgbox2
    let a=1;
    //手机号码校验
    var reg = new RegExp('^(13[0-9]|14[579]|15[0-3,5-9]|18[0-9]|19[89])\\d{8}$');
    //身份证校验
    var idCardReg = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i;
    if (name == '') {
      wx.showToast({
        title: '姓名不能为空',
        icon: 'none'
      })
      return
    }
    if (gongsi == '') {
      wx.showToast({
        title: '请输入你的公司名称',
        icon: 'none'
      })
      return
    }
    if(phone==''){
      wx.showToast({
        title: '手机号不能为空',
        icon:'none'
      })
      return
    }else if(!reg.test(phone)){
      wx.showToast({
        title: '手机号格式不正确',
        icon:'none'
      })
      return
    }else if(phone<11){
      wx.showToast({
        title: '手机号位数必须是11位',
        icon: 'none'
      })
      return
    }
    if(idcard==''){
      wx.showToast({
        title: '身份证号不能为空',
        icon:'none'
      })
      return
    }else if(!idCardReg.test(idcard)){
      wx.showToast({
        title: '身份证格式不正确，请确认后输入',
        icon:'none'
      })
    }else if(idcard<18){
      wx.showToast({
        title: '身份证号不能小于18位',
        icon: 'none'
      })
      return
    }
    if (imgbox == '') {
      wx.showToast({
        title: '身份证件照不能为空',
        icon: 'none'
      })
      return
    }
    if (imgbox1 == '') {
      wx.showToast({
        title: '身份证件照不能为空',
        icon: 'none'
      })
      return
    }
    wx.cloud.callFunction({
      name:"cplogin",
      success:res=>{
        this.setData({
          openid:res.result.openid
        })
      }
    })
    wx.cloud.database().collection("cpmsg").where({
      _openid:this.data.openid
    }).get({
      success:res=>{
        if(res.data==""){
          wx.cloud.database().collection("cpmsg").add({
            data: {
              phone: phone,
              idcard: idcard,
              cpaddress: cpaddress,
              name: name,
              gongsi: gongsi,
              imgbox: imgbox,
              imgbox1: imgbox1,
              imgbox2: imgbox2,
              shangjia: 1
            },
            success: res => {
              wx.showToast({
                title: '提交成功',
              })
            }
          })
        }else{
          wx.showToast({
            title: '你已经添加了草坪信息',
            icon:"none"
          })
          return
        }
      }
    }) 
  }
})