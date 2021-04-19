/**
 * 压测与性能分析
 * autocannon进行压测 autocannon -c 1000 -d 10 -p 1 http://127.0.0.1:3000/crypto
 * 启动服务的时候使用node --inspect命令在chrome中查看并打断点
 * node --prof命令可以生成报告性能分析报告
 */
 const crypto = require('crypto') // 字符串加密
 const Koa = require('koa')
 const Router = require('koa-router');
 const os = require('os');
 
 const app = new Koa();
 const router = new Router();
 const ifaces = os.networkInterfaces();
 
 router.get('/', async(ctx, next) => {

    ctx.body = 'Hello wrold'

    ctx.status = 200
    next()
});
let reqNum = 0
 router.get('/crypto', async(ctx, next) => {
     const salt = crypto.randomBytes(128).toString('base64')
     const hash = crypto.pbkdf2Sync('crypto', salt, 10000, 64, 'sha512').toString('hex')
     ctx.body = { hash }
     console.log(reqNum++)
     ctx.status = 200
     next()
 });
 
 router.get('/empty', async(ctx, next) => {
 
     ctx.body = { hash: 'empty' }
     reqNum++;
 
     ctx.status = 200
     next()
 });
 
app.use(router.routes()).use(router.allowedMethods());
 
Object.keys(ifaces).forEach(function (ifname) {

ifaces[ifname].forEach(function (iface) {
    if ('IPv4' !== iface.family || iface.internal !== false) {
        return;
    }
    console.log('http://' + iface.address + ':3000');
  });
});
 app.listen(3000, () => {
     console.log("listen 3000")
 })