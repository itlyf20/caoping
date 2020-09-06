var img
var gsname
var db=wx.cloud.database()
var wlmsg=db.collection("wlmsg")
Page({
  data: {
    phone:'',
    idcard:'',
    wlads:'',
    img1:'',
    img2:'',
    img3:'',
    gsname:'',
    name:''
  },
  phone(e) {this.setData({phone: e.detail.value})},
  idcard(e) {this.setData({idcard: e.detail.value})},
  gsname(e) { this.setData({ gsname: e.detail.value })},
  wlads(e) {this.setData({wlads: e.detail.value})},
  name(e) { this.setData({ name: e.detail.value }) },
  sfz1: function () {
    var that = this
    wx.chooseImage({
      success: function (res) {
        wx.showToast({
          title: '上传成功',
        })
        that.setData({
          img1: res.tempFilePaths
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
  sfz2: function () {
    var that = this
    wx.chooseImage({
      success: function (res) {
        wx.showToast({
          title: '上传成功',
        })
        that.setData({
          img2: res.tempFilePaths
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
          img3: res.tempFilePaths
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
  regist: function (e) {
    let name = this.data.name
    let phone = this.data.phone
    let idcard = this.data.idcard
    let wlads = this.data.wlads
    let gsname=this.data.gsname
    let img1 = this.data.img1
    let img2=this.data.img2
    let img3= this.data.img3
    //手机号码校验
    var reg = new RegExp('^(13[0-9]|14[579]|15[0-3,5-9]|18[0-9]|19[89])\\d{8}$');
    //身份证校验
    var idCardReg = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i;
    if (name == '') {
      wx.showToast({
        title: '手机号不能为空',
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
        icon: 'none'
      })
      return
    }else if (phone < 11) {
      wx.showToast({
        title: '手机号位数必须是11位',
        icon: 'none'
      })
      return
    }
    if(idcard==''){
      wx.showToast({
        title: '身份证号不能为空',
        icon: 'none'
      })
      return
    }else if(!idCardReg.test(idcard)){
      wx.showToast({
        title: '身份证号格式不正确',
        icon: 'none'
      })
      return
    }else if(idcard<18){
      wx.showToast({
        title: '身份证号不能小于18位',
        icon: 'none'
      })
      return
    }
    if (gsname == '') {
      wx.showToast({
        title: '公司名称不能为空',
        icon: 'none'
      })
      return
    }
    if (img1 == '') {
      wx.showToast({
        title: '身份证件照不能为空',
        icon: 'none'
      })
      return
    }
    if (img2== '') {
      wx.showToast({
        title: '身份证件照不能为空',
        icon: 'none'
      })
      return
    }
    wx.cloud.callFunction({
      name: "cplogin",
      success: res => {
        this.setData({
          openid: res.result.openid
        })
      }
    })
    wx.cloud.database().collection("wlmsg").where({
      _openid:this.data.openid
    }).get({
      success:res=>{
        if(res.data==""){
          wlmsg.add({
            data: {
              phone: phone,
              name: name,
              idcard: idcard,
              gsname: gsname,
              wlads: wlads,
              img1: img1,
              img2: img2,
              img3: img3
            }
          }).then(res => {
            wx.showToast({
              title: '提交成功',
            })
          }).catch(err => {
            console.log(err)
          })

        }else{
          wx.showToast({
            title: '你已经注册了物流商家',
            icon:"none"
          })
        }
      }
    })
   
  }
})