import { Context } from 'egg';

export default function AuthMiddleware(): any {
  return async (ctx: Context, next: () => Promise<any>) => {
    const ignore = ctx.app.config.authLogin.ignore || [];
    if (ignore.some(whiteUrl => ctx.url.startsWith(whiteUrl))) {
      await next();
    } else {
      const urlPrefix = 'server';
      if (ctx.url.indexOf(urlPrefix) >= 0) {
        const accountId = ctx.cookies.get('sign', {
          signed: false,
          encrypt: true
        });
        if (accountId) {
          // const token = ctx.cookies.get('token');
          await next();
        } else {
          ctx.status = 401;
        }
      } else {
        await next();
      }
    }
  };
}
