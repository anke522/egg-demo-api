import { Context } from 'egg';
import { Like } from 'typeorm';
import { Interface } from '../entity/Interface';
import { AbstractService } from './AbstractService';

export default class InterfaceService extends AbstractService<Interface> {
  constructor(ctx: Context) {
    super(ctx, Interface);
  }
  async query(limit = 30, page = 1, q: string, order: string) {
    const reg = new RegExp(`.*${q}.*`, 'i');
    this.repository.find({ skip: (page - 1) * limit });
  }
  count() {
    return this.repository.count();
  }
  countByRepositoryId(repositoryId: string) {
    return this.repository.count({
      repositoryId
    });
  }
  countByModuleId(moduleId: string) {
    return this.repository.count({
      moduleId
    });
  }
  search(repositoryId?: string, moduleId?: string, name: string) {
    const where: any = {};
    if (repositoryId) {
      where.repositoryId = repositoryId;
    }
    if (moduleId) {
      where.repositoryId = repositoryId;
    }
    if (name) {
      where.name = Like(name);
    }
    return this.repository.find({ where });
  }
  findById(interfaceId: string) {
    return this.repository.findOne(interfaceId);
  }
  findByRepositoryId(repositoryId: string) {
    return this.repository.find({ repositoryId });
  }
  create(
    name: string,
    repositoryId: string,
    moduleId: string,
    accountId: string,
    description?: string
  ) {
    const interfaceObj = this.repository.create({
      name,
      description,
      repositoryId,
      moduleId,
      creatorId: accountId
    });
    return this.repository.save(interfaceObj);
  }
  update(interfaceObj: Interface) {
    return this.repository.save(interfaceObj);
  }
}
