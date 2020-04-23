import AbstractController from './abstractController';

export default class OrganizationController extends AbstractController {
  async count() {
    const count = await this.service.organizationsService.count();
    this.success({ count });
  }
  async query() {
    const { name } = this.ctx.query;
    const accountId = this.getAccountId();
  }
}
