// 解析htmL生成ast
import { parse } from './parse';
// src/compiler/create-compiler
function createCompilerCreator(baseCompile) {
  return function createCompiler(baseOptions) {
    function compile(template, options) {
      const finalOptions = Object.create(baseOptions)
      // duioptions进行一系列的处理
      if (options) {
        // 如果有modules属性两个方法上的options合并
        if (options.modules) {
          finalOptions.modules =
            (baseOptions.modules || []).concat(options.modules)
        }
        // merge custom directives
        // if (options.directives) {
        //   finalOptions.directives = extend(
        //     Object.create(baseOptions.directives || null),
        //     options.directives
        //   )
        // }
        // copy other options
        // for (const key in options) {
        //   if (key !== 'modules' && key !== 'directives') {
        //     finalOptions[key] = options[key]
        //   }
        // }
      }

      const compiled = baseCompile(template.trim(), finalOptions)
      return compiled
    }
    return {
      compile,
      compileToFunctions: createCompileToFunctionFn(compile)
    }
  }
}
// compileToFunctions方法做了啥 src/compiler/to-function
function createCompileToFunctionFn(compile) {
  // 创建一个空对象 好处是没有任何原型上的方法
  const cache = Object.create(null)
  return function compileToFunctions(template, options, vm) {
    // 合并options
    // options = extend({}, options)
    // delimiters干了啥 改变读取数据的值默认值是{{}}改变纯文本插入分隔符
    const key = options.delimiters
    ? String(options.delimiters) + template
    : template
    // 有这个模板直接返回没有的话创建
    if (cache[key]) {
      return cache[key]
    }
    // 运行传过来的compiled方法就是执行createCompilerCreator传过去的baseCompile方法
    const compiled = compile(template, options)
    const res = {}
    res.render = new Function(compiled.render)
    // res.staticRenderFns = compiled.staticRenderFns.map(code => {
    //   return new Function(code)
    // })
    return (cache[key] = res)
  }
}
// render和staticRenderFns的实现 src/compiler/codegen/index
function generate (ast, options) {
  // 返回一个对象包含staticRenderFns、directives、dataGenFns、transforms、warns
  // const state = new CodegenState(options)
  // _c是创建createElement方法在render.js
  const code = ast ? genElement(ast, state) : '_c("div")'
  // 使用了with句将某个对象添加到作用域链的顶部
  return {
    render: `with(this){return ${code}}`,
    // staticRenderFns: state.staticRenderFns
    staticRenderFns: []
  }
}
// 生成代码
function genElement(el, state) {
  // 判断for if once等在html上的属性执行不同的方法去创建
  let code
  // component组件
  if (el.component) {
    // code = genComponent(el.component, el, state)
  } else {
    let data
    if (!el.plain || (el.pre && state.maybeComponent(el))) {
      data = genData(el, state)
    }
    const children = el.inlineTemplate ? null : genChildren(el, state, true)
    // code渲染 传入标签tag如果有data传入data有children传入children
    code = `_c('${el.tag}'${data ? `,${data}` : ''}${children ? `,${children}` : ''})`
  }
  // 动画方法
  for (let i = 0; i < state.transforms.length; i++) {
    code = state.transforms[i](el, code)
  }
  return code
}
// src/compiler/index 调用createCompilerCreator方法创建compiler编译器
const createCompiler = createCompilerCreator(function baseCompile(template, options) {
  // 生成ast
  const ast = parse(template.trim(), options)
  // 判断
  // if (options.optimize !== false) {
  //   optimize(ast, options)
  // }
  // 获取到render方法并把ast转化可以创建元素
  const code = generate(ast, options)
  // $mount中的render方法就是generate中的render
  return {
    ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
})
const baseOptions = {};
const { compile, compileToFunctions } = createCompiler(baseOptions)
export { compile, compileToFunctions };
