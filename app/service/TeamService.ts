import { Service, Context } from 'egg';
import {
  Repository,
  getRepository,
  ObjectID,
  Any,
  FindOneOptions,
  FindConditions,
  Like,
  In,
  MongoRepository,
  getMongoRepository
} from 'typeorm';
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
    const memberCondition: FindConditions<TeamMember> = {
      accountId,
      role: TeamMemberRoleEnum.OWNER
    };
    return this.repository.find({
      where: {
        $or: [{ name: Like('测试') }]
        // members: { accountId },
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
        members: { accountId, role: TeamMemberRoleEnum.OWNER }
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
}
