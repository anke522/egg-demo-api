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
      const member = new TeamMember(accountId.toString(), account.email);
      team.members = [member];
    }
    const result = await this.service.teamService.save(team);
    this.success(result);
  }
  async search() {
    const { queryString, limit, page } = this.ctx.request.body;
    const repositories = await this.service.repositoryService.search(limit, page, queryString);
    this.success(repositories);
  }
  async getTeam() {
    const teamId = this.ctx.params.id;
    const team = await this.service.teamService.findById(teamId);
    this.success(team);
  }
  async allOwnTeam() {
    const { keyword, limit, page } = this.ctx.request.query;
    const accountId = this.getAccountId();
    const repositories = await this.service.teamService.queryOwnTeam(
      parseInt(limit),
      parseInt(page),
      accountId,
      keyword
    );
    this.successPageResult(repositories[0], repositories[1]);
  }
  async addTeamMember() {
    const { id, email } = this.ctx.request.body;
    assert(id, 403, 'required teamId');
    assert(email, 403, 'required account email');
    const accountId = this.getAccountId();
    const team = await this.service.teamService.checkOwnTeam(accountId, id);
    assert(team, 403, 'team ignore or team not alone current account');
    if (team) {
      const account = await this.service.accountService.findByEmail(email);
      assert(account, 403, 'account email ignore');
      if (account) {
        const member = new TeamMember(account.id.toString(), account.email, TeamMemberRoleEnum.DEV);
        const result = await this.service.teamService.addMember(team.id, member);
        this.success(result);
      }
    }
  }
  async deleteTeam() {
    const { id } = this.ctx.request.query;
    assert(id, 403, 'required teamId');
    const accountId = this.getAccountId();
    const team = await this.service.teamService.checkOwnTeam(accountId, id);
    assert(team, 403, 'team ignore or team not alone current account');
    if (team) {
      const result = await this.service.teamService.delete(team.id);
      this.success(result);
    }
  }
  async deleteTeamMember() {
    const { id, memberId } = this.ctx.request.query;
    assert(id, 403, 'required teamId');
    assert(memberId, 403, 'required memberId');
    const accountId = this.getAccountId();
    const team = await this.service.teamService.checkOwnTeam(accountId, id);
    assert(team, 403, 'team ignore or team not alone current account');
    if (team) {
      const result = await this.service.teamService.deleteMember(team.id, memberId);
      this.success(result);
    }
  }
  async updateTeamMemberRole() {
    const { id, memberId, role } = this.ctx.request.body;
    assert(id, 403, 'required teamId');
    assert(memberId, 403, 'required memberId');
    assert(role, 403, 'required role');
    const accountId = this.getAccountId();
    const team = await this.service.teamService.checkOwnTeam(accountId, id);
    assert(team, 403, 'team ignore or team not alone current account');
    if (team) {
      const result = await this.service.teamService.changeMemberRole(team.id, memberId, role);
      this.success(result);
    }
  }
}
