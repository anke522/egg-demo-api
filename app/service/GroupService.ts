import { Service } from 'egg';
import { Group } from '../entity/Group';
import { getRepository } from 'typeorm';
export default class GroupService extends Service {
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
    const groupRepository = getRepository(Group);
    await groupRepository.save(group);
  }
  async create(group) {
    const groupNew = {
      name: group.name
    };
    const groupRepository = getRepository(Group);
    await groupRepository.save(groupNew);
  }
}
