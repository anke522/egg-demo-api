import { AbstractService } from './AbstractService';
import { Avatar } from '../entity/Avatar';
import { Context } from 'egg';

export default class AvatarService extends AbstractService<Avatar> {
  constructor(ctx: Context) {
    super(ctx, Avatar);
  }
  findById(avatarId: string) {
    return this.repository.findOne(avatarId);
  }
  findByAccountId(accountId: string) {
    return this.repository.findOne({ accountId });
  }
  update(avatarId: string, basecode: string, type: string) {
    return this.repository.update(avatarId, {
      type,
      basecode
    });
  }
  create(basecode: string, type?: string) {
    const avatar = this.repository.create({
      basecode,
      type
    });
    return this.repository.save(avatar);
  }
}
