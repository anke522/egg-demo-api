import { Service, Context } from 'egg';
import { Repository, getRepository, Like } from 'typeorm';
import { Organization } from '../entity/Organization';

export class OrganizationService extends Service {
  repository: Repository<Organization>;
  constructor(ctx: Context) {
    super(ctx);
    this.repository = getRepository(Organization);
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
      where: {
        organizationMembers: { repositoryId: 'asdss' }
      },
      skip: (page - 1) * limit,
      take: limit
    });
  }
  query(accountId: string, name: string, limit = 15, page = 1) {
    return this.repository.find({
      where: {
        $or: [{ ownerId: accountId }, { creatorId: accountId }]
      },
      skip: (page - 1) * limit,
      take: limit
    });
  }
}
