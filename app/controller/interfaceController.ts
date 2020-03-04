import AbstractController from './abstractController';

export default class InterfaceController extends AbstractController {
  async query() {
    const { groupId } = this.ctx.params;
    const { limit = 30, page = 1, q = '', order = '{}' } = this.ctx.query;
    const condition = { isDeleted: false };
  }
}
