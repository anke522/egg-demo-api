import { Service, Context } from 'egg';
import { Repository, getRepository } from 'typeorm';
import { Team, TeamMember } from '../entity/Team';

export default class TeamService extends Service {
  repository: Repository<Team>;
  constructor(ctx: Context) {
    super(ctx);
    this.repository = getRepository(Team);
  }
  checkRepeat(name: string) {
    return this.repository.count({ name });
  }
  findById(teamId: string) {
    return this.repository.findOne({ id: teamId });
  }
  findOwnTeam(accountId: string) {
    return this.repository.find({
      where: {
        members: { accountId }
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
