class Subscribe {
  constructor () {
    this.arr = []
  }
  add (fn) {
    this.arr.push(fn)
  }
  remove(fn) {
    const ind = this.arr.indexOf(fn)
    if (this.arr.length !== 0 && ind !== -1) {
      this.arr[ind] = null;
    }
  }
  fire(...arg) {
    let pond = this.arr;
    for(let i = 0; i < pond.length; i++) {
        let item = pond[i];
        //如果itme为空了,最好把它删除掉
        if (!item) {
            pond.splice(i, 1);
            //如果用了splice要防止数组塌陷问题，即删除了一个元素后，后面所有元素的索引默认都会减1
            // i--;
            continue;
        }
        item(...arg);
    }
  }
}
