import { Repository as RepositoryEntity } from '../entity/Repository';
import { Service, Context } from 'egg';
import { Repository, getRepository, Like } from 'typeorm';

export class RepositoryService extends Service {
  repository: Repository<RepositoryEntity>;
  constructor(ctx: Context) {
    super(ctx);
    this.repository = getRepository(RepositoryEntity);
  }
  search(limit = 15, page = 1, queryString = '') {
    const where = {};
    if (queryString.length > 0) {
      Object.assign(where, { name: Like(queryString) });
    }
    return this.repository.find({
      where,
      select: ['id', 'ownerId', 'name', 'description'],
      skip: (page - 1) * limit,
      take: limit,
      order: { id: 1 }
    });
  }
  totalCount() {
    return this.repository.count();
  }
}
