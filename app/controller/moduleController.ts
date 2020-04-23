import AbstractController from './abstractController';
import assert = require('http-assert');
import { Module } from '../entity/Module';
import { ICreateLogger } from '../service/LoggerService';
import { LoggerType } from '../entity/Logger';

export default class ModuleController extends AbstractController {
  async findByRepositoryId() {
    const { repositoryId } = this.ctx.request.query;
    const modules = await this.service.moduleService.findByRepositoryId(repositoryId);
    this.success(modules);
  }
  async create() {
    const { name, description, repositoryId } = this.ctx.request.body;
    const repository = await this.service.repositoryService.findById(repositoryId);
    assert(repository, 403, 'error repository id');
    const module = await this.service.moduleService.create(
      name,
      description,
      repositoryId,
      this.getAccountId()
    );
    this.success(module);
  }
  async update() {
    const { name, description, id } = this.ctx.request.body;
    const updateResult = await this.service.moduleService.update(name, description, id);
    const accountId = this.getAccountId();
    const mod = await this.service.moduleService.findById(id);
    const account = await this.service.accountService.findById(accountId);
    const content = `<a href="/account/profile/${accountId}">${account?.name}</a>更新了模块 <a href="/repository/editor?id=${mod?.repositoryId}&mod=${id}">${name}</a>`;
    const loggerParams: ICreateLogger = {
      type: LoggerType.UPDATE,
      content,
      accountId,
      repositoryId: mod?.repositoryId,
      moduleId: id,
    };
    this.service.loggerService.create(loggerParams);
    this.success(mod);
  }
  async remove() {
    const { id } = this.ctx.request.query;
    const result = await this.service.moduleService.delete(id);
    const interfaceResult = await this.service.interfaceService.deleteByModuleId(id);
    const propertyResult = await this.service.propertyService.deleteByModuleId(id);

    this.success(true);
  }
}
