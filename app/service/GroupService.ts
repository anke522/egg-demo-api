import { Service, Context } from 'egg';
import { Group } from '../entity/Group';
import { getRepository, Repository } from 'typeorm';
export default class GroupService extends Service {
  repository: Repository<Group>;
  constructor(ctx: Context) {
    super(ctx);
    this.repository = getRepository(Group);
  }
  update(groupId, group) {
    const config = {
      _id: groupId,
      manager: this.ctx.authUser._id
    };

    if (this.ctx.isManager) {
      delete config.manager;
    }

    return this.ctx.model.Group.findOneAndUpdate(
      config,
      Object.assign(group, { modifiedTime: Date.now() }),
      { new: true }
    );
  }
  async save(group: Group) {
    await this.repository.save(group);
  }
  async create(group) {
    const groupNew = {
      name: group.name
    };
    await this.repository.save(groupNew);
  }
  totalCount() {
    return this.repository.count();
  }
  search(keyword: string) {
    const where = {};
    if (keyword) {
      Object.assign(where, {
        $or: [
          { email: new RegExp(keyword, 'i') },
          { username: new RegExp(keyword, 'i') }
        ]
      });
    }
    return this.repository.find({
      select: ['name'],
      take: 10
    });
  }
}
