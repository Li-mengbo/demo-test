const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require("@babel/traverse");
const babel = require('@babel/core');
const Koa = require('koa');
const app = new Koa();

function readFile(filename) {
  // 读取文件
  const file = fs.readFileSync(filename, 'UTF-8')
  // 解析生成AST
  const ast = parser.parse(file, {
    sourceType: "module",
  })
  let dependencies = {}
  // 遍历AST
  traverse.default(ast, {
      //获取通过import引入的模块
      ImportDeclaration({node}){
        const dirname = path.dirname(filename)
        const newFile = './' + path.join(dirname, node.source.value)
        //保存所依赖的模块
        dependencies[node.source.value] = newFile
    }
  });
  //通过@babel/core和@babel/preset-env进行代码的转换es6转换为es5
  const {code} = babel.transformFromAst(ast, null, {
      presets: ["@babel/preset-env"]
  })
  return {
    filename,//该文件名
    dependencies,
    code
  };
}
//entry为入口文件
function stepTwo(entry){
  const entryModule = readFile(entry)
  //这个数组是核心，虽然现在只有一个元素，往后看你就会明白
  const graphArray = [entryModule]
  for(let i = 0; i < graphArray.length; i++){
      const item = graphArray[i];
      const {dependencies} = item;//拿到文件所依赖的模块集合(键值对存储)
      for(let j in dependencies){
          graphArray.push(
            readFile(dependencies[j])
          )//敲黑板！关键代码，目的是将入口模块及其所有相关的模块放入数组
      }
  }
  //接下来生成图谱
  const graph = {}
  graphArray.forEach(item => {
      graph[item.filename] = {
          dependencies: item.dependencies,
          code: item.code
      }
  })
  return graph
}
//下面是生成代码字符串的操作，仔细看，不要眨眼睛哦！
function step3(entry){
  //要先把对象转换为字符串，不然在下面的模板字符串中会默认调取对象的toString方法，参数变成[Object object],显然不行
  const graph = JSON.stringify(stepTwo(entry))
  return `
      (function(graph) {
          //require函数的本质是执行一个模块的代码，然后将相应变量挂载到exports对象上
          function require(module) {
              //localRequire的本质是拿到依赖包的exports变量
              function localRequire(relativePath) {
                  return require(graph[module].dependencies[relativePath]);
              }
              var exports = {};
              (function(require, exports, code) {
                  eval(code);
              })(localRequire, exports, graph[module].code);
              return exports;//函数返回指向局部变量，形成闭包，exports变量在函数执行后不会被摧毁
          }
          require('${entry}')
      })(${graph})`
}
// console.log(stepTwo('./ceshi.js'))
const code = stepTwo('./ceshi.js')
app.use(async ctx => {
  ctx.body = code;
});
app.listen(3000);
