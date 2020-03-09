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
      if (passport) {
        const token = this.app.jwt.sign(
          account.id.toHexString(),
          account.passsalt
        );
        this.ctx.cookies.set('accountId', account.id.toHexString());
        this.ctx.cookies.set('token', token);
        this.success(account);
      } else {
        this.error({ msg: '密码错误' });
      }
    } else {
      this.error({ msg: '账号错误' });
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
    if (rs) {
      this.success(rs);
    } else {
      this.error('重置账户密码失败');
    }
  }
  async delete(accountId: string) {
    const result = await this.service.accountService.delete(accountId);
    if (result.affected) {
      this.success({ msg: 'ok' });
    } else {
      this.error('重置账户密码失败');
    }
  }

  async logout() {
    const id = this.ctx.id;
    Object.assign(this.ctx.session, { id: undefined, token: undefined });
    this.success({ id });
  }

  async updateAvatar() {
    const baseCode: string = this.ctx.request.body.baseCode;
    const pngPrefixCode = 'data:image/png;base64,';
    const jpegPrefixCode = 'data:image/jpeg;base64,';

    if (baseCode.length - (baseCode.length / 8) * 2 > 200000) {
      this.error({ msg: '图片大小不能超过200kb' });
    }
  }

  async search() {
    const { queryString, limit, page } = this.ctx.request.body;
    const accounts = await this.service.accountService.search(
      limit,
      page,
      queryString
    );
    this.success(accounts);
  }
}
