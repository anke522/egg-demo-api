import { Context } from 'egg';
import { Module } from '../entity/Module';
import { AbstractService } from './AbstractService';

export default class ModuleService extends AbstractService<Module> {
  constructor(ctx: Context) {
    super(ctx, Module);
  }
  count() {
    return this.repository.count();
  }
  countByRepositoryId(repositoryId: string) {
    return this.repository.count({
      repositoryId,
    });
  }
  create(name: string, description: string, repositoryId: string, accountId: string) {
    const repository = this.repository.create({
      name,
      description,
      repositoryId,
      creatorId: accountId,
    });
    return this.repository.save(repository);
  }
  findById(moduleId: string) {
    return this.repository.findOne(moduleId);
  }
  findByRepositoryId(repositoryId: string) {
    return this.repository.find({
      repositoryId,
    });
  }
  findByName(name: string) {
    return this.repository.find({
      name,
    });
  }
  delete(moduleId: string) {
    return this.repository.delete(moduleId);
  }
  deleteByRepositoryId(repositoryId: string) {
    return this.repository.delete({ repositoryId });
  }
  checkRepeatName(name: string) {
    return this.repository.count({
      name,
    });
  }
  update(name: string, description: string, moduleId: string) {
    return this.repository.update(moduleId, {
      name,
      description,
    });
  }
}
