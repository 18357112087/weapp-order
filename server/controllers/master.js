const { mysql } = require('../qcloud.js');
module.exports = async ctx => {
  ctx.state.data = await mysql.select('*').from('master')
}