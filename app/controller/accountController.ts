import AbstractController from './abstractController';
import * as svgCaptcha from 'svg-captcha';
import { compare } from 'bcryptjs';
export default class AccountController extends AbstractController {
  async count() {
    const count = this.service.accountService.totalCount();
    this.success(count);
  }

  async register() {
    const { name, email, password } = this.ctx.request.body;
    if (!name) {
      this.error({ msg: '用户名不能为空' });
    }
    if (!email) {
      this.error({ msg: '该邮件不能为空' });
    }
    if (!password) {
      this.error({ msg: '密码不能为空' });
    }
    const exists = await this.service.accountService.checkRepeat(email);
    if (exists) {
      this.error({ msg: '该邮件已被注册，请更换再试。' });
    }

    const user = await this.service.accountService.create(
      name,
      email,
      password
    );

    this.success(user);
  }
  createCaptcha() {
    const captcha = svgCaptcha.create();
    this.ctx.session.captcha = captcha.text;
    this.ctx.set('Content-Type', 'image/svg+xml');
    this.success(captcha.data);
  }
  async login() {
    const { email, password } = this.ctx.request.body;
    if (!email) {
      this.error({ msg: '该邮件不能为空' });
    }
    if (!password) {
      this.error({ msg: '密码不能为空' });
    }
    let passport = false;
    const account = await this.service.accountService.findByEmail(email)!;
    if (account) {
      passport = await compare(password, account.password);
    }
    if (passport) {
      this.ctx.session.id = account?.id;
      this.success(account);
    } else {
      this.error({ msg: '账号或密码错误' });
    }
  }
  async changePassword() {
    const { email, password, verifyPassword } = this.ctx.request.body;
    if (!email) {
      this.error({ msg: '该邮件不能为空' });
    }
    if (!password) {
      this.error({ msg: '密码不能为空' });
    }
    if (!verifyPassword) {
      this.error({ msg: '旧密码不能为空' });
    }
    const account = await this.service.accountService.findByEmail(email)!;

    if (!account) {
      this.error('此邮箱未注册');
    }
    const verify = await compare(verifyPassword, account!.password);
    if (!verify) {
      this.error('旧密码错误');
    }
    const rs = await this.service.accountService.updatePassword(
      account!.id,
      password
    );
    if (rs.affected! > 0) {
      this.success(rs);
    }
    this.error('重置账户密码失败');
  }
}
