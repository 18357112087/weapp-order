const { mysql } = require('../qcloud.js');

/**
 * 响应 GET 请求（响应微信配置时的签名检查请求）
 */
async function get(ctx, next) {
 
}

async function post(ctx, next) {
  await mysql('inorder').insert(ctx.request.body)
  ctx.state.data = true
}

module.exports = {
  post,
  get
}
