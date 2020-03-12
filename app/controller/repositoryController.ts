import AbstractController from './abstractController';
import assert = require('http-assert');
import { LoggerType } from '../entity/Logger';
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

  async update() {
    // const result = this.service.repositoryService.update();
  }
  async create() {
    const { memberIds, name, description } = this.ctx.request.body;
    assert(name, 403, 'required repository name');
    assert(description, 403, 'required repository description');
    const accountId = this.getAccountId();
    const account = await this.service.accountService.findById(accountId);
    const repository = await this.service.repositoryService.create(
      accountId,
      name,
      description,
      memberIds
    );
    const content = `<a href="/user/profile/${accountId}">${account?.name}</a> 添加了项目 <a href="/project/${repository.id}">${name}</a>`;
    this.service.loggerService.create(LoggerType.CREATE, content, repository.id.toString());
    this.success(repository);
  }
}
