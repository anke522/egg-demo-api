import AbstractController from './abstractController';
import assert = require('http-assert');
import { TeamMember } from '../entity/Team';
export default class TeamController extends AbstractController {
  async count() {
    return await this.service.teamService.totalCount();
  }
  async create() {
    const { name, description } = this.ctx.request.body;
    assert(name, 403, 'required group name');
    const team = this.service.teamService.create(name, description);
    const accountId = this.ctx.session.id;
    const account = await this.service.accountService.findById(accountId);
    if (account) {
      const member = new TeamMember();
      member.accountId = accountId;
      member.email = account.email;
      team.members = [member];
    }
    const result = await this.service.teamService.save(team);
    this.success(result);
  }
}
