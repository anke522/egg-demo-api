import AbstractController from './abstractController';

export default class HomeController extends AbstractController {
  public async index() {
    const { ctx } = this;
    ctx.body = await ctx.service.test.sayHi('egg');
  }
}
