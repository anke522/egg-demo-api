import { Service, Context } from 'egg';
import { ObjectID, MongoRepository, getMongoRepository } from 'typeorm';
import { Team, TeamMember, TeamMemberRoleEnum } from '../entity/Team';
export default class TeamService extends Service {
  repository: MongoRepository<Team>;
  constructor(ctx: Context) {
    super(ctx);
    this.repository = getMongoRepository(Team);
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
  changeMemberRole(
    teamId: ObjectID,
    memberAccountId: string,
    role: TeamMemberRoleEnum
  ) {
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
}
