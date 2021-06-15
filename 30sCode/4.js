const get = (from, str, defaultStr) => {
  const string = str
  .replace(/\[([^\[\]]*)\]/g, '.$1.')
  .split('.')
  .filter(t => t !== '')
  .reduce((prev, cur) => prev && prev[cur], from);
  return string || defaultStr
}

const obj = {
  selector: { to: { val: 'val to select' } },
  target: [1, 2, { a: 'test' }],
};
const object = { a: [{ b: { c: 3 } }] }
console.log(get(object, 'a[0].b.c', 1));
