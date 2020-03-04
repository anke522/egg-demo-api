import { Service, Context } from 'egg';
import { Repository, getRepository } from 'typeorm';
import { Interface } from '../entity/Interface';

export default class InterfaceService extends Service {
  interfaceRepository: Repository<Interface>;
  constructor(ctx: Context) {
    super(ctx);
    this.interfaceRepository = getRepository(Interface);
  }
  async query(limit = 30, page = 1, q: string, order: string) {
    const reg = new RegExp(`.*${q}.*`, 'i');
    this.interfaceRepository.find({ skip: (page - 1) * limit });
  }
}
