import { Service, Context } from 'egg';
import { MongoRepository, getMongoRepository } from 'typeorm';

export class AbstractService<T> extends Service {
  repository: MongoRepository<T>;
  constructor(ctx: Context, c: new () => T) {
    super(ctx);
    this.repository = getMongoRepository(c);
  }
}
