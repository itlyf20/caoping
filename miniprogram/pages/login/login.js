var app=getApp()
console.log(app)
Page({
  /**
   * 页面的初始数据
   */
  data: {
    canIUse:wx.canIUse("button.open-type.getUserInfo")
  },  
  bindgetUserInfo(e){
    var that=this
    wx.cloud.callFunction({
      name:"cplogin",
      success(res){
        e.detail.userInfo.openid=res.result.openid
        app.globalData.userInfo=e.detail.userInfo
        wx.switchTab({
          url: '../../pages/mine/mine',
        })
        wx.setStorageSync("userInfo", e.detail.userInfo)
      },
     
    })
    wx.getUserInfo({
        success:res=>{
          var nickname=res.userInfo.nickname
          var gender=res.userInfo.gender
          if(gender==1){
            gender="男"
          }else if(gender==2){
            gender="女"
          }
          var province=res.userInfo.province
          var city=res.userInfo.city
          var avatarurl=res.userInfo.avatarUrl
          wx.cloud.database().collection("usermsg").get({
            success:res=>{
              if(res.data==""){
                wx.cloud.database().collection("usermsg").add({
                  data: {
                    nickname: nickname,
                    gender: gender,
                    province: province,
                    city: city,
                    avatarurl: avatarurl
                  },
                }).then(res => {
                  console.log("添加成功", res)
                }).catch(err => {
                  console.log("添加失败", err)
                })
              }else{
                console.log("数据库已有数据")
              }
            }
          })
        }
    })
  }
})