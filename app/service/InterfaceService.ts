import { Context } from 'egg';
import { Like, FindManyOptions } from 'typeorm';
import { Interface } from '../entity/Interface';
import { AbstractService } from './AbstractService';
export interface IInterfaceCreate {
  name: string;
  description: string;
  status: number;
  method: string;
  url: string;
  moduleId: string;
  repositoryId: string;
  creatorId?: string;
}
export default class InterfaceService extends AbstractService<Interface> {
  constructor(ctx: Context) {
    super(ctx, Interface);
  }
  async query(limit: number, page: number, moduleId: string, keyword?: string) {
    const where = {
      moduleId,
    };
    if (limit === Number.NaN) {
      limit = 15;
    }
    if (page === Number.NaN) {
      page = 1;
    }
    if (keyword) {
      Object.assign(where, { name: new RegExp(keyword, 'i') });
    }
    this.repository.findAndCount({ where, skip: (page - 1) * limit });
  }
  count() {
    return this.repository.count();
  }
  countByRepositoryId(repositoryId: string) {
    return this.repository.count({
      repositoryId,
    });
  }
  countByModuleId(moduleId: string) {
    return this.repository.count({
      moduleId,
    });
  }
  search(name: string, repositoryId?: string, moduleId?: string) {
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
  findAll(optionsOrConditions?: FindManyOptions<Interface>) {
    return this.repository.find(optionsOrConditions);
  }
  findById(interfaceId: string) {
    return this.repository.findOne(interfaceId);
  }
  findByRepositoryId(repositoryId: string) {
    return this.repository.find({ repositoryId });
  }
  findByModuleId(moduleId: string) {
    return this.repository.find({
      where: {
        moduleId,
      },
    });
  }
  create(params: IInterfaceCreate) {
    const interfaceObj = this.repository.create(params);
    return this.repository.save(interfaceObj);
  }
  update(interfaceObj: Interface) {
    return this.repository.save(interfaceObj);
  }
  delete(id: string) {
    return this.repository.delete(id);
  }
  deleteByModuleId(moduleId: string) {
    return this.repository.delete({ moduleId });
  }
}
