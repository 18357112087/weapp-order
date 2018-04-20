// pages/order/order.js
const Zan = require('../../component/index');
const util = require('../../utils/util.js');
const qcloud = require('../../vendor/wafer2-client-sdk/index');
var config = require('../../config')
const app = getApp()
Page(Object.assign({}, Zan.Field, {

  /**
   * 页面的初始数据
   */
  data: {
    startDate: util.formatTime(new Date()),
    endDate: util.formatTime(new Date((new Date().getTime() + 604800000))),
    form: {
      name: {
        placeholder: '请输入预约姓名',
        componentId: 'name'
      },
      tel: {
        inputType: 'tel',
        placeholder: '请输入预约手机号码',
        componentId: 'tel'
      }
    },
    master: [],
    masterIndex: 0,
    name: null,
    tel: null,
    valid: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this
    
    if(!app.globalData.userInfo) {
      util.showBusy('正在登录')
      qcloud.login({
        success(result) {
          if (result) {
            util.showSuccess('登录成功')
            app.globalData.userInfo = result
          } else {
            // 如果不是首次登录，不会返回用户信息，请求用户信息接口获取
            qcloud.request({
              url: config.service.requestUrl,
              login: true,
              success(result) {
                util.showSuccess('登录成功')
                app.globalData.userInfo = result
              },

              fail(error) {
                util.showModel('请求失败', error)
                console.log('request fail', error)
              }
            })
          }
        },

        fail(error) {
          util.showModel('登录失败', error)
          console.log('登录失败', error)
        }
      })
    }
    qcloud.request({
      method: 'get',
      url: config.service.master,
      success(result) {
        that.setData({master: [{id:0, name: '请选择'}].concat(result.data.data)})
      }
    })
  },
  onMasterChange(e) {
    this.setData({
      masterIndex: e.detail.value,
      valid: e.detail.value != 0 && this.data.date && this.data.name && this.data.tel
    });
  },
  bindDateChange(e) {
    this.setData({
      date: e.detail.value,
      valid: this.data.masterIndex && this.data.name && this.data.tel
    });
  },
  handleZanFieldChange(e) {
    const { componentId, detail } = e;

    this.setData({
      [componentId] : detail.value,
      valid: this.data.masterIndex != 0 && this.data.date && this.data[componentId == 'tel' ? 'name' : tel]
    })
  },
  formSubmit(event) {
    util.showBusy('正在请求')
    wx.request({
      url: config.service.order,
      method: 'post',
      data: Object.assign({}, {
        open_id: app.globalData.userInfo.data.data.openId
      }, event.detail.value),
      success(result) {
        if(result.data.data === true) {
          wx.redirectTo({
            url: '../index/index',
            success() {
              util.showSuccess('预约成功')
            }
          })
        }
      }
    })
  },
  formReset(event) {
    console.log('[zan:field:reset]', event);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
}))