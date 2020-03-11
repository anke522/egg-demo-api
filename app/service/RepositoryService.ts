import { Repository as RepositoryEntity, RepositoryMember } from '../entity/Repository';
import { AbstractService } from './AbstractService';
import { Like } from 'typeorm';
import { Context } from 'egg';

export default class RepositoryService extends AbstractService<RepositoryEntity> {
  constructor(ctx: Context) {
    super(ctx, RepositoryEntity);
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
  create(accountId: string, name: string, description: string, members: RepositoryMember[]) {
    const repository = this.repository.create({
      name,
      description,
      creatorId: accountId,
      ownerId: accountId,
      members
    });
    this.repository.save(repository);
  }
}
