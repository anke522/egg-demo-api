import AbstractController from './abstractController';
import assert = require('http-assert');

export default class GroupController extends AbstractController {
  async update() {
    const { id } = this.ctx.params;
    const group = this.ctx.request.body;
    const rs = await this.service.groupService.update(id, group);
    if (rs && rs._id) {
      this.success(rs);
    } else {
      this.error('更新失败');
    }
  }
  async create() {
    const { body } = this.ctx.request;
    assert(body.name, 403, 'required group name');
    const resources = await this.service.groupService.create(body);
    this.ctx.body = { resources };
  }
}
