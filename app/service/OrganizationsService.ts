import { Service, Context } from 'egg';
import { Like, MongoRepository, getMongoRepository } from 'typeorm';
import { Organization } from '../entity/Organization';

export class OrganizationService extends Service {
  repository: MongoRepository<Organization>;
  constructor(ctx: Context) {
    super(ctx);
    this.repository = getMongoRepository(Organization);
  }
  count() {
    return this.repository.count();
  }
  search(limit = 15, page = 1, keyword: string) {
    const where = {};
    if (keyword) {
      Object.assign(where, { name: Like(keyword) });
    }
    return this.repository.find({
      where,
      skip: (page - 1) * limit,
      take: limit
    });
  }
  getOwnOrganization(accountId: string) {
    return this.repository.find({
      where: {
        $or: [{ ownerId: accountId }, { creatorId: accountId }]
      }
    });
  }
}
