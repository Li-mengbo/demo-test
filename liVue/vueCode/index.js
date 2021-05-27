import Vue from './src/index';
const app = new Vue({
  el: 'a',
  data: {
    name: 1,
    arr: [1, 2, {
      a: 1
    }]
  },
  template: '<div>111222</div>'
})
console.log(app)
app.name = '222';
app.arr.push(3);
