import AbstractController from './abstractController';
import assert = require('http-assert');
import { TeamMember, TeamMemberRoleEnum } from '../entity/Team';
export default class TeamController extends AbstractController {
  async count() {
    return await this.service.teamService.totalCount();
  }
  async create() {
    const { name, description } = this.ctx.request.body;
    assert(name, 403, 'required team name');
    const count = await this.service.teamService.findByName(name);
    assert(!count, 403, 'repeat team name');
    const team = this.service.teamService.create(name, description);
    const accountId = this.getAccountId();
    const account = await this.service.accountService.findById(accountId);
    if (account) {
      const member = new TeamMember();
      member.accountId = accountId;
      member.email = account.email;
      member.role = TeamMemberRoleEnum.OWNER;
      team.members = [member];
    }
    const result = await this.service.teamService.save(team);
    this.success(result);
  }
  async addTeamMember() {
    const { id, email } = this.ctx.request.body;
    assert(id, 403, 'required teamId');
    assert(email, 403, 'required account email');
    const accountId = this.getAccountId();
    // assert(account, 403, 'email ignore');
    const teamOb = await this.service.teamService.findById(id);
    const team = await this.service.teamService.checkOwnTeam(accountId, id);
    this.success(team);
  }
}
