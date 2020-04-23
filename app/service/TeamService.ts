import { Context } from 'egg';
import { ObjectID } from 'typeorm';
import { Team, TeamMember, TeamMemberRoleEnum } from '../entity/Team';
import { AbstractService } from './AbstractService';
export default class TeamService extends AbstractService<Team> {
  constructor(ctx: Context) {
    super(ctx, Team);
  }
  checkRepeat(name: string) {
    return this.repository.count({ name });
  }
  checkOwnTeam(accountId: string, teamId: string) {
    return this.repository.findOne(teamId, {
      where: {
        members: {
          $elemMatch: {
            accountId,
            role: TeamMemberRoleEnum.OWNER
          }
        }
      }
    });
  }
  findById(teamId: string) {
    return this.repository.findOne(teamId);
  }
  findByName(name: string) {
    return this.repository.findOne({ name });
  }
  findOwnTeam(accountId: string) {
    return this.repository.find({
      where: {
        members: {
          $elemMatch: {
            accountId,
            role: TeamMemberRoleEnum.OWNER
          }
        }
      }
    });
  }
  totalCount() {
    return this.repository.count();
  }
  create(name: string, description: string, members: TeamMember[] = []) {
    return this.repository.create({ name, description, members });
  }
  save(team: Team) {
    return this.repository.save(team);
  }
  delete(teamId: ObjectID) {
    return this.repository.delete(teamId);
  }
  addMember(teamId: ObjectID, member: TeamMember) {
    return this.repository.updateOne(
      { _id: teamId },
      {
        $addToSet: { members: member }
      }
    );
  }
  deleteMember(teamId: ObjectID, memberAccountId: string) {
    return this.repository.updateOne(
      { _id: teamId },
      {
        $pull: { members: { accountId: memberAccountId } }
      }
    );
  }
  changeMemberRole(teamId: ObjectID, memberAccountId: string, role: TeamMemberRoleEnum) {
    return this.repository.updateOne(
      {
        _id: teamId,
        members: {
          $elemMatch: {
            account: memberAccountId
          }
        }
      },
      {
        $set: {
          'members.$.role': role
        }
      }
    );
  }
  search(limit = 15, page = 1, keyword: string) {
    const where = {};
    if (keyword) {
      Object.assign(where, { name: new RegExp(keyword, 'i') });
    }
    return this.repository.find({
      where,
      skip: (page - 1) * limit,
      take: limit
    });
  }
  getSelfTeam(limit = 15, page = 1, accountId: string, keyword: string) {
    const where = {};
    if (keyword) {
      Object.assign(where, { name: new RegExp(keyword, 'i') });
    }
    return this.repository.find({
      where,
      skip: (page - 1) * limit,
      take: limit
    });
  }
  queryOwnTeam(limit = 15, page = 1, accountId: string, keyword?: string) {
    if (limit === Number.NaN) {
      limit = 15;
    }
    if (page === Number.NaN) {
      page = 1;
    }
    const where = {
      members: {
        $elemMatch: {
          accountId,
          role: TeamMemberRoleEnum.OWNER
        }
      }
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
}
