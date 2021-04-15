// ajax请求
/**
 * 状态码
 * 200 成功
 * 301 永久重定向
 * 302 临时重定向
 * 304 缓存还可以使用
 * 400 客户端语法错误
 * 401 未授权
 * 403 请求页面访问被禁止
 * 404 资源不存在
 * 416 与服务器交互超出资源大小
 * 500 服务器内部错误
 * 502 网关错误接受网关是无效的
 * 504 响应超时
 */

(function(window){
  window.Ajax = function (options) {
      return new init(options)
  }
  function init(options) {

  }
  var xml = new XMLHttpRequest();
  // xml.open('GET', 'http://m-xyyf-api.ai160.com/statistics/channel')
  xml.open('POST', 'http://m-xyyf-api.ai160.com/mobile/wxPay/prePay')
  xml.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
  xml.setRequestHeader('uid', '1111')
  xml.onreadystatechange = function(){
    if(xml.readyState === 4) {
      if(xml.status === 200) {
        console.log(xml.responseText)
      }
    }
  }
  var data = JSON.stringify({
    channel: "2006",
    productId: "1026"
  })
  xml.send(data)
})(window)

