import { Repository as RepositoryEntity, RepositoryMember } from '../entity/Repository';
import { AbstractService } from './AbstractService';
import { Like, ObjectID } from 'typeorm';
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
  create(
    accountId: string,
    name: string,
    description: string,
    members: RepositoryMember[],
    organizationId?: string
  ) {
    const repository = this.repository.create({
      name,
      description,
      creatorId: accountId,
      ownerId: accountId,
      members,
      organizationId
    });
    return this.repository.save(repository);
  }
  checkOwn(accountId: string, repositoryId: string) {
    return this.repository.findOne(repositoryId, { where: { ownerId: accountId } });
  }
  delete(id: string) {
    return this.repository.delete(id);
  }
  findParticipate(limit: number, page: number, accountId: string, keyword?: string) {
    if (limit === Number.NaN || limit === undefined) {
      limit = 15;
    }
    if (page === Number.NaN || limit === undefined) {
      page = 1;
    }
    const where = {
      $or: [
        {
          members: {
            $elemMatch: {
              accountId
            }
          }
        },
        {
          creatorId: accountId
        },
        {
          ownerId: accountId
        }
      ]
    };
    if (keyword) {
      Object.assign(where, {
        name: new RegExp(keyword, 'i')
      });
    }
    return this.repository.findAndCount({
      where,
      skip: (page - 1) * limit,
      take: limit
    });
  }
  findOrgParticipate(limit: number, page: number, orgId: string, keyword?: string) {
    if (limit === Number.NaN) {
      limit = 15;
    }
    if (page === Number.NaN) {
      page = 1;
    }
    const where = {
      organizationId: orgId
    };
    if (keyword) {
      Object.assign(where, { name: new RegExp(keyword, 'i') });
    }
    return this.repository.findAndCount({
      where,
      skip: (page - 1) * limit,
      take: limit
    });
  }
  findById(repositoryId: string) {
    return this.repository.findOne(repositoryId);
  }
  findByName(name: string) {
    return this.repository.findOne({ name });
  }
  addMember(repositoryId: ObjectID, member: RepositoryMember) {
    return this.repository.updateOne(
      { _id: repositoryId },
      {
        $addToSet: { members: member }
      }
    );
  }
  deleteMember(repositoryId: ObjectID, memberAccountId: string) {
    return this.repository.updateOne(
      { _id: repositoryId },
      {
        $pull: { members: { accountId: memberAccountId } }
      }
    );
  }
  update(repository: RepositoryEntity) {
    return this.repository.save(repository);
  }
  // queryOwnTeam(limit = 15, page = 1, accountId: string, keyword?: string) {
  //   const where = {
  //     $or: {

  //       members: {
  //         $elemMatch: {
  //           accountId,
  //           role: TeamMemberRoleEnum.OWNER
  //         }
  //       }
  //     }
  //   };
  //   if (keyword) {
  //     Object.assign(where, { name: Like(keyword) });
  //   }
  //   return this.repository.findAndCount({
  //     where,
  //     skip: (page - 1) * limit,
  //     take: limit
  //   });
  // }
}
