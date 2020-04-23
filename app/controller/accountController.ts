import AbstractController from './abstractController';
import * as svgCaptcha from 'svg-captcha';
import { compare } from 'bcryptjs';
import assert = require('http-assert');
import path = require('path');
import fs = require('fs');
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

    const user = await this.service.accountService.create(name, email, password);

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
        const token = this.app.jwt.sign(account.id.toHexString(), account.passsalt);
        this.ctx.cookies.set('sign', account.id.toString(), {
          signed: false,
          httpOnly: false,
          encrypt: true
        });
        this.ctx.cookies.set('token', token, {
          signed: false,
          httpOnly: false,
          encrypt: true
        });
        this.ctx.session.token = token;
        this.success({
          email: account.email,
          id: account.id,
          name: account.name,
          token
        });
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
    const rs = await this.service.accountService.updatePassword(account!.id, password);
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

    let imageType;
    if (baseCode.length - (baseCode.length / 8) * 2 > 200000) {
      this.error({ msg: '图片大小不能超过200kb' });
    }
    if (baseCode.includes(pngPrefixCode)) {
      imageType = 'image/png';
    } else if (baseCode.includes(jpegPrefixCode)) {
      imageType = 'image/jpeg';
    } else {
      this.error({ msg: '仅支持jpeg和png格式的图片' });
    }
    const avatar = this.service.avatarService.create(baseCode, imageType);
    this.success(avatar);
  }
  async avatar() {
    const { accountId } = this.ctx.request.query;
    assert(accountId, 403, 'required accountId Id');
    const avatar = await this.service.avatarService.findByAccountId(accountId);
    let type;
    let dataBuffer;
    if (avatar) {
      type = avatar.type;
      dataBuffer = new Buffer(avatar.basecode, 'base64');
    } else {
      const imagePath = path.join(this.ctx.app.baseDir, '/static/images/avatar2.jpg');
      dataBuffer = fs.readFileSync(imagePath);
      type = 'image/jpg';
    }
    this.ctx.set('Content-type', type);
    this.ctx.body = dataBuffer;
  }
  async search() {
    const { queryString, limit, page } = this.ctx.request.body;
    const accounts = await this.service.accountService.search(limit, page, queryString);
    this.success(accounts);
  }
  async accountFlow() {
    const accountId = this.getAccountId();
    const { limit, page } = this.ctx.request.body;
    const repositories = await this.service.repositoryService.findParticipate(
      limit,
      page,
      accountId
    );
    if (repositories.length > 0) {
      const flows = this.service.loggerService.queryByRepositoryIds(
        repositories[0].map(r => r.id.toString())
      );
      this.success(flows);
    } else {
      this.success([]);
    }
  }
  async repositoryFlow() {
    const accountId = this.getAccountId();
    const repository = await this.service.repositoryService.findById(accountId);
    assert(repository, 403, 'required repository Id');
    if (repository) {
      const flows = this.service.loggerService.queryRepository(repository.id);
      this.success(flows);
    } else {
      this.success([]);
    }
  }
}
