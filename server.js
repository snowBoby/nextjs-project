const Koa = require('koa');
const Router = require('koa-router');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });//用next初始化app 开发和生产环境 next处理方式不一样
const handle = app.getRequestHandler() //处理http请求的一个响应

//等到pages页面全部编译完成才响应请求 否则pages内容没编译完成就响应会报错
app.prepare().then(() => {
  const server = new Koa();
  const router = new Router();

  router.get('/test',(ctx)=>{

  })
  server.use(router.routes())

  server.use(async (ctx, next) => {
    console.log(ctx)
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
  })
  server.listen(3000,()=>{
    console.log("localhost listening 3000")
  })
})
