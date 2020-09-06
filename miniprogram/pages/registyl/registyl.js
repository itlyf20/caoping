var img
var db=wx.cloud.database()
var ylmsg=db.collection("ylmsg")
Page({
  data: {
    phone:'',
    idcard:'',
    img1:'',
    img2:"",
    img3:'',
    name:'',
    gongsi:''
  },
  phone(e){this.setData({phone:e.detail.value})},
  idcard(e) { this.setData({ idcard: e.detail.value }) },
  name(e) { this.setData({ name: e.detail.value }) },
  gongsi(e) { this.setData({ gongsi: e.detail.value }) },
  address(e) { this.setData({ address: e.detail.value }) },
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
  reigst:function(e){
    let phone=this.data.phone
    let idcard = this.data.idcard
    let name = this.data.name
    let gongsi = this.data.gongsi
    let address=this.data.address
    let img1 = this.data.img1
    let img2 = this.data.img2
    let img3=this.data.img3
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
        title: '请输入你的公司或店铺名称',
        icon: 'none'
      })
      return
    }
    if (phone == '') {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none'
      })
      return
    } else if (!reg.test(phone)) {
      wx.showToast({
        title: '手机号格式不正确',
        icon: 'none'
      })
      return
    } else if (phone < 11) {
      wx.showToast({
        title: '手机号位数必须是11位',
        icon: 'none'
      })
      return
    }
    if (idcard == '') {
      wx.showToast({
        title: '身份证号不能为空',
        icon: 'none'
      })
      return
    } else if (!idCardReg.test(idcard)) {
      wx.showToast({
        title: '身份证格式不正确，请确认后输入',
        icon: 'none'
      })
    } else if (idcard < 18) {
      wx.showToast({
        title: '身份证号不能小于18位',
        icon: 'none'
      })
      return
    }
    if (address == '') {
      wx.showToast({
        title: '地址不能为空不能为空',
        icon: 'none'
      })
      return
    }
    if (img1 == '') {
      wx.showToast({
        title: '身份证正面证件照不能为空',
        icon: 'none'
      })
      return
    }
    if (img2 == '') {
      wx.showToast({
        title: '身份证反面证件照不能为空',
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
    wx.cloud.database().collection("ylmsg").where({
      _openid:this.data.openid
    }).get({
      success:res=>{
        if(res.data==""){
          ylmsg.add({
            data: {
              name: name,
              gongsi: gongsi,
              phone: phone,
              idcard: idcard,
              address: address,
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
            title: '你已经注册了园林商家',
            icon:"none"
          })
        }
      }
    })
    
  }
})