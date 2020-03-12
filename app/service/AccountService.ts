import { Context } from 'egg';
import { Account } from '../entity/Account';
import { UpdateResult, ObjectID } from 'typeorm';
import { genSalt, hash } from 'bcryptjs';
import { AbstractService } from './AbstractService';
export default class UserService extends AbstractService<Account> {
  selectAttributes;
  constructor(ctx: Context) {
    super(ctx, Account);
    this.selectAttributes = ['id', 'name', 'email', 'role', 'createAt', 'updateAt'];
  }
  async checkRepeat(email: string): Promise<boolean> {
    const count = await this.repository.count({ email });
    if (count > 0) {
      return true;
    }
    return false;
  }
  queryAll() {
    return this.repository.find({
      select: ['id', 'name', 'email', 'role', 'createAt', 'updateAt']
    });
  }
  async create(name: string, email: string, password: string) {
    const salt = await genSalt(10);
    const hashSalt = await hash(password, salt);
    const newUser = this.repository.save({
      email,
      name,
      password: hashSalt,
      passsalt: salt
    });
    return newUser;
  }
  async updatePassword(id: ObjectID, password: string) {
    const salt = await genSalt(10);
    const hashSalt = await hash(password, salt);
    const result: UpdateResult = await this.repository.update(
      { id },
      {
        password: hashSalt,
        passsalt: salt
      }
    );
    return result;
  }
  totalCount() {
    return this.repository.count();
  }
  findById(accountId: string) {
    return this.repository.findOne(accountId);
  }
  findByEmail(email: string) {
    return this.repository.findOne({ email });
  }
  update(user: Account) {
    return this.repository.update(user.id, user);
  }
  /**
   *
   * @param limit
   * @param page
   * @param keyword
   */
  search(limit = 15, page = 1, keyword: string) {
    const where = {};
    if (keyword.length > 0) {
      Object.assign(where, {
        $or: [{ email: new RegExp(keyword, 'i') }, { username: new RegExp(keyword, 'i') }]
      });
    }
    return this.repository.find({
      where,
      select: this.selectAttributes,
      skip: (page - 1) * limit,
      take: limit,
      order: { id: 1 }
    });
  }
  delete(accountId: string) {
    return this.repository.delete(accountId);
  }
}
