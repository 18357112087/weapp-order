// pages/order/order.js
const Zan = require('../../component/index');
const util = require('../../utils/util.js');
const qcloud = require('../../vendor/wafer2-client-sdk/index');
var config = require('../../config')
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
    masterIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this
    qcloud.request({
      method: 'get',
      url: config.service.master,
      success(result) {
        that.setData({master: result.data.data})
      }
    })
  },
  onMasterChange(e) {
    this.setData({
      masterIndex: e.detail.value
    });
  },
  bindDateChange(e) {
    this.setData({
      date: e.detail.value
    });
  },
  handleZanFieldChange(e) {
    const { componentId, detail } = e;

    console.log('[zan:field:change]', componentId, detail);
  },
  formSubmit(event) {
    console.log('[zan:field:submit]', event.detail.value);
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