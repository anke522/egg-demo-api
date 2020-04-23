import { Controller } from 'egg';

export default class AbstractController extends Controller {
  success(data) {
    this.ctx.status = 200;
    this.ctx.body = data;
  }
  successPageResult(data: any[], count: number) {
    this.ctx.status = 200;
    this.ctx.body = {
      list: data,
      total: count
    };
  }
  error(data, code = 403) {
    if (typeof data === 'string') {
      this.ctx.throw(code, data);
    } else {
      this.ctx.throw(data.code, data.msg);
    }
  }
  notFound(msg = 'not found') {
    this.ctx.throw(404, msg);
  }
  getAccountId() {
    const token = this.ctx.cookies.get('token', {
      signed: false,
      encrypt: true
    });
    const accountId = this.app.jwt.decode(token);
    return accountId;
  }
}
