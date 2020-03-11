import AbstractController from './abstractController';
import assert = require('http-assert');
export default class RepositoryController extends AbstractController {
  async search() {
    const { queryString, limit, page } = this.ctx.request.body;
    const repositories = await this.service.repositoryService.search(limit, page, queryString);
    this.success(repositories);
  }
  async count() {
    const count = await this.service.repositoryService.totalCount();
    this.success({ count });
  }

  async update() {}
  async create() {
    const { memberIds, name, description } = this.ctx.request.body;
    assert(name, 403, 'required repository name');
    assert(description, 403, 'required repository description');
    const accountId = this.getAccountId();
    const repository = await this.service.repositoryService.create(
      accountId,
      name,
      description,
      memberIds
    );
    this.success(repository);
  }
}
