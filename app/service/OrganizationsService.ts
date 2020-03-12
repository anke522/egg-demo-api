import { Context } from 'egg';
import { Like } from 'typeorm';
import { Organization } from '../entity/Organization';
import { AbstractService } from './AbstractService';

export class OrganizationService extends AbstractService<Organization> {
  constructor(ctx: Context) {
    super(ctx, Organization);
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
