import Vue from './src/vue';
const app = new Vue({
  data: {
    name: 1,
    arr: [1, 2, {
      a: 1
    }]
  }
})
console.log(app)
app.name = '222'