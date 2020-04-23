import AbstractController from './abstractController';
import assert = require('http-assert');
import { LoggerType } from '../entity/Logger';
import { ICreateLogger } from '../service/LoggerService';
export default class RepositoryController extends AbstractController {
  async search() {
    const { queryString, limit, page } = this.ctx.request.body;
    const repositories = await this.service.repositoryService.search(limit, page, queryString);
    this.success(repositories);
  }
  async searchOwn() {
    const { keyword, limit, page } = this.ctx.request.query;
    const accountId = this.getAccountId();

    const repositories = await this.service.repositoryService.findParticipate(
      parseInt(limit),
      parseInt(page),
      accountId,
      keyword
    );
    this.successPageResult(repositories[0], repositories[1]);
  }
  async searchByOrgId() {
    const organizationId = this.ctx.query.organizationId;
    const { keyword, limit, page } = this.ctx.request.query;
    const repositories = await this.service.repositoryService.findOrgParticipate(
      parseInt(limit),
      parseInt(page),
      organizationId,
      keyword
    );
    this.successPageResult(repositories[0], repositories[1]);
  }
  async count() {
    const count = await this.service.repositoryService.totalCount();
    this.success({ count });
  }

  async update() {
    // const result = this.service.repositoryService.update();
  }
  async create() {
    const { memberIds, name, description, organizationId } = this.ctx.request.body;
    assert(name, 403, 'required repository name');
    assert(description, 403, 'required repository description');
    const accountId = this.getAccountId();
    const account = await this.service.accountService.findById(accountId);
    const repository = await this.service.repositoryService.create(
      accountId,
      name,
      description,
      memberIds,
      organizationId
    );
    const defaultModule = await this.service.moduleService.create(
      '默认模块',
      '仓库创建时系统自动创建的模块。可以根据自行修改',
      repository.id.toString()
    );
    const content = `<a href="/user/profile/${accountId}">${account?.name}</a> 添加了仓库 <a href="/project/${repository.id}">${name}</a>`;
    const loggerParams: ICreateLogger = {
      type: LoggerType.CREATE,
      content,
      accountId,
      repositoryId: repository.id.toString(),
    };
    this.service.loggerService.create(loggerParams);
    repository.modules = [defaultModule];
    this.success(repository);
  }
  async getRepository() {
    const repositoryId = this.ctx.query.id;
    const repository = await this.service.repositoryService.findById(repositoryId);
    const modules = await this.service.moduleService.findByRepositoryId(repositoryId);
    if (repository) {
      repository.modules = modules;
    }
    this.success(repository);
  }
}
