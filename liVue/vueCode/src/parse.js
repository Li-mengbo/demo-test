// 源码是这样实现的比较复杂可能会手写一个比较简单的版本有一个stack栈管理比对标签是否成组把比对的值生成ast语法树
export function createASTElement(tag, attr, parent) {
  return {
    type: 1,
    tag,
    attrsList: attrs,
    attrsMap: makeAttrsMap(attrs),
    rawAttrsMap: {},
    parent,
    children: []
  }
}
export function parse(template, options) {
  let root
  parseHtml(template, {
    start (tag, attrs, unary, start, end) {

    },
    end (tag, start, end) {},
    chars (tag, start, end) {},
    comment(text, start, end) {}
  })
  return root
}
const comment = /^<!\--/;
const conditionalComment = /^<!\[/
const doctype = /^<!DOCTYPE [^>]+>/i;
// 匹配标签名字a-123
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`;
// abc:123 abc可有可无
const qnameCapture = `((?:${ncname}\\:)?${ncname})`;
// 开始标签
const startTagOpen = new RegExp(`^<${qnameCapture}`);
// 结束标签
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`);

const startTagClose = /^\s*(\/?)>/

function parseHtml(html, options) {
  const stack = []
  let index = 0
  let last, lastTag
  while (html) {
    last = html
    // isPlainTextElement判断是不是script,style,textarea标签
    if (!lastTag) {
      // 标签开始
      let textEnd = html.indexOf('<')
      if (textEnd === 0) {
        // Comment:
        if (comment.test(html)) {
          const commentEnd = html.indexOf('-->')

          if (commentEnd >= 0) {
            advance(commentEnd + 3)
            continue
          }
        }

        // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
        // 类似这种<!--[if !IE]>--><link href="non-ie.css" rel="stylesheet"><!--<![endif]-->
        if (conditionalComment.test(html)) {
          const conditionalEnd = html.indexOf(']>')

          if (conditionalEnd >= 0) {
            advance(commentEnd + 2)
            continue
          }
        }
        // Doctype:
        const doctypeMatch = html.match(doctype)
        if (doctypeMatch) {
          advance(doctypeMatch[0].length)
          continue
        }

        // End tag:结束标签
        const endTagMatch = html.match(endTag)
        if (endTagMatch) {
          const curIndex = index
          advance(endTagMatch[0].length)
          parseEndTag(endTagMatch[1], curIndex, index)
          continue
        }

        // Start tag:开始标签匹配到<
        const startTagMatch = parseStartTag()
        if (startTagMatch) {
          handleStartTag(startTagMatch)
          // 匹配换行符
          // if (shouldIgnoreFirstNewline(startTagMatch.tagName, html)) {
          //   advance(1)
          // }
          continue
        }
      }

      let text, rest, next
      // 文本标签在前
      if (textEnd >= 0) {
        rest = html.slice(textEnd)
        while (
          !endTag.test(rest) &&
          !startTagOpen.test(rest) &&
          !comment.test(rest) &&
          !conditionalComment.test(rest)
        ) {
          // < in plain text, be forgiving and treat it as text
          next = rest.indexOf('<', 1)
          if (next < 0) break
          textEnd += next
          rest = html.slice(textEnd)
        }
        text = html.substring(0, textEnd)
      }
      // 找不到元素标签
      if (textEnd < 0) {
        text = html
      }
      // 文本标签
      if (text) {
        advance(text.length)
      }
    } else {
      let endTagLength = 0
      const stackedTag = lastTag.toLowerCase()
      const reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'))
      const rest = html.replace(reStackedTag, function (all, text, endTag) {
        endTagLength = endTag.length
        if (!isPlainTextElement(stackedTag) && stackedTag !== 'noscript') {
          text = text
            .replace(/<!\--([\s\S]*?)-->/g, '$1') // #7298
            .replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1')
        }
        if (shouldIgnoreFirstNewline(stackedTag, text)) {
          text = text.slice(1)
        }
        if (options.chars) {
          options.chars(text)
        }
        return ''
      })
      index += html.length - rest.length
      html = rest
      parseEndTag(stackedTag, index - endTagLength, index)
    }
  }
  parseEndTag()
  // 修改html的值
  function advance (n) {
    index += n
    html = html.substring(n)
  }
  // 结束标签
  function parseEndTag (tagName, start, end) {
    let pos, lowerCasedTagName
    if (start == null) start = index
    if (end == null) end = index

    // 对标签进行比对看是不是一个标签
    if (tagName) {
      lowerCasedTagName = tagName.toLowerCase()
      for (pos = stack.length - 1; pos >= 0; pos--) {
        if (stack[pos].lowerCasedTag === lowerCasedTagName) {
          break
        }
      }
    } else {
      // If no tag name is provided, clean shop
      pos = 0
    }

    if (pos >= 0) {
      // Close all the open elements, up the stack
      for (let i = stack.length - 1; i >= pos; i--) {
        if (options.end) {
          options.end(stack[i].tag, start, end)
        }
      }

      // Remove the open elements from the stack
      stack.length = pos
      lastTag = pos && stack[pos - 1].tag
    } else if (lowerCasedTagName === 'br') {
      if (options.start) {
        options.start(tagName, [], true, start, end)
      }
    } else if (lowerCasedTagName === 'p') {
      if (options.start) {
        options.start(tagName, [], false, start, end)
      }
      if (options.end) {
        options.end(tagName, start, end)
      }
    }
  }
  // 开始标签匹配到之后返回对象
  function parseStartTag () {
    const start = html.match(startTagOpen)
    if (start) {
      const match = {
        tagName: start[1],
        attrs: [],
        start: index
      }
      advance(start[0].length)
      let end, attr
      // 判断有没有attribute属性
      while (!(end = html.match(startTagClose)) && (attr = html.match(dynamicArgAttribute) || html.match(attribute))) {
        attr.start = index
        advance(attr[0].length)
        attr.end = index
        match.attrs.push(attr)
      }
      if (end) {
        advance(end[0].length)
        match.end = index
        return match
      }
    }
  }
  // 开始标签匹配到的值
  function handleStartTag (match) {
    const tagName = match.tagName

    const unary = '';

    const l = match.attrs.length
    const attrs = new Array(l)
    for (let i = 0; i < l; i++) {
      const args = match.attrs[i]
      const value = args[3] || args[4] || args[5] || ''
      // 处理a标签
      // const shouldDecodeNewlines = tagName === 'a' && args[1] === 'href'
      //   ? options.shouldDecodeNewlinesForHref
      //   : options.shouldDecodeNewlines
      attrs[i] = {
        name: args[1],
        value: decodeAttr(value, shouldDecodeNewlines)
      }
    }
    // 单标签
    // if (!unary) {
    //   stack.push({ tag: tagName, lowerCasedTag: tagName.toLowerCase(), attrs: attrs, start: match.start, end: match.end })
    //   lastTag = tagName
    // }
  }
}
function makeAttrsMap(attrs) {
  const map = {}
  for (let i = 0, l = attrs.length; i < l; i++) {
    map[attrs[i].name] = attrs[i].value
  }
  return map
}
