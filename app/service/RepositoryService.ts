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
  create(accountId: string, name: string, description: string, members: RepositoryMember[]) {
    const repository = this.repository.create({
      name,
      description,
      creatorId: accountId,
      ownerId: accountId,
      members
    });
    return this.repository.save(repository);
  }
  checkOwn(accountId: string, repositoryId: string) {
    return this.repository.findOne(repositoryId, { where: { ownerId: accountId } });
  }
  delete(id: string) {
    return this.repository.delete(id);
  }
  findParticipate(accountId: string) {
    return this.repository.find({
      select: ['id', 'name'],
      where: {
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
      }
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
}
