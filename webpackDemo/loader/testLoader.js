var loaderUtils = require('loader-utils')
module.exports = function testLoader(source){
  // console.log(source)
  console.log('---', loaderUtils.getOptions(this).name)
  return source
}
