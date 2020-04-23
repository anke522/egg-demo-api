import AbstractController from './abstractController';
import { LoggerType } from '../entity/Logger';
import { ICreateLogger } from '../service/LoggerService';
import { IInterfaceCreate } from '../service/InterfaceService';
import { Interface } from '../entity/Interface';

export default class InterfaceController extends AbstractController {
  async query() {
    const { groupId } = this.ctx.params;
    const { limit = 30, page = 1, q = '', order = '{}' } = this.ctx.query;
    const condition = { isDeleted: false };
  }
  async searchByModuleId() {
    const { mod } = this.ctx.query;
    const itfs = await this.service.interfaceService.findByModuleId(mod);
    this.success(itfs);
  }
  async create() {
    const params: IInterfaceCreate = this.ctx.request.body as IInterfaceCreate;
    const accountId = this.getAccountId();
    const account = await this.service.accountService.findById(accountId);
    params.creatorId = accountId;
    const newInterface = await this.service.interfaceService.create(params);
    const content = `<a href="/account/profile/${accountId}">${account?.name}</a> 添加了接口 <a href="/repository/editor?id=${params.repositoryId}&mod=${params.moduleId}&itf=${newInterface.id}">${params.name}</a>`;
    const loggerParams: ICreateLogger = {
      type: LoggerType.CREATE,
      content,
      accountId,
      repositoryId: params.repositoryId,
      moduleId: params.moduleId,
      interfaceId: newInterface.id.toString(),
    };
    this.service.loggerService.create(loggerParams);
    this.success(newInterface);
  }
  async update() {
    const params: Interface = this.ctx.request.body as Interface;
    const accountId = this.getAccountId();
    const account = await this.service.accountService.findById(accountId);
    const newInterface = await this.service.interfaceService.update(params);
    const content = `<a href="/account/profile/${accountId}">${account?.name}</a>更新了接口 <a href="/repository/editor?id=${params.repositoryId}&mod=${params.moduleId}&itf=${newInterface.id}">${params.name}</a>`;
    const loggerParams: ICreateLogger = {
      type: LoggerType.UPDATE,
      content,
      accountId,
      repositoryId: params.repositoryId,
      moduleId: params.moduleId,
      interfaceId: newInterface.id.toString(),
    };
    this.service.loggerService.create(loggerParams);
    this.success(newInterface);
  }
  async remove() {
    const { interfaceId } = this.ctx.request.query;
    const accountId = this.getAccountId();
    const account = await this.service.accountService.findById(accountId);
    const itf = await this.service.interfaceService.findById(interfaceId);
    const interfaceResult = await this.service.interfaceService.delete(interfaceId);
    const propertyResult = await this.service.propertyService.deleteByInterfaceId(interfaceId);

    const content = `<a href="/account/profile/${accountId}">${account?.name}</a> 删除了接口 <a href="/repository/editor?id=${itf?.repositoryId}&mod=${itf?.moduleId}>${itf?.name}</a>`;
    const loggerParams: ICreateLogger = {
      type: LoggerType.DELETE,
      content,
      accountId,
      repositoryId: itf!.repositoryId,
      moduleId: itf!.moduleId,
      interfaceId,
    };
    this.service.loggerService.create(loggerParams);
    this.success(true);
  }
  async updateAll() {
    const { id } = this.ctx.request.query;
    const itf = this.ctx.request.body as Interface;
  }
}
