import { Service, Context } from 'egg';
import { Repository, getRepository } from 'typeorm';
import { Module } from '../entity/Module';

export class ModuleService extends Service {
  repository: Repository<Module>;
  constructor(ctx: Context) {
    super(ctx);
    this.repository = getRepository(Module);
  }
}
