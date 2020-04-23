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
  query(limit = 15, page = 1, keyword: string) {
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
  queryByAccountId(accountId: string, limit = 15, page = 1, keyword: string) {
    const where = {};
    if (keyword) {
      Object.assign(where, { name: Like(keyword) });
    }
    return this.repository.findAndCount({
      where: {
        $or: [{ ownerId: accountId }, { creatorId: accountId }]
      },
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
  getOwnOrganizationCount(accountId: string) {
    return this.repository.count({ ownerId: accountId });
  }
  search(keyword: string) {
    const where = {};
    if (keyword) {
      Object.assign(where, {
        $or: [{ email: new RegExp(keyword, 'i') }, { username: new RegExp(keyword, 'i') }]
      });
    }
    return this.repository.find({
      select: ['name'],
      take: 10
    });
  }
}
