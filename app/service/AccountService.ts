import { Service, Context } from 'egg';
import { Account } from '../entity/Account';
import { getRepository, Repository, UpdateResult, ObjectID } from 'typeorm';
import { genSalt, hash } from 'bcryptjs';
import { ObjectId } from 'mongodb';
export default class UserService extends Service {
  repository: Repository<Account>;
  selectAttributes;
  constructor(ctx: Context) {
    super(ctx);
    this.repository = getRepository(Account);
    this.selectAttributes = [
      'id',
      'name',
      'email',
      'role',
      'createAt',
      'updateAt'
    ];
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
  async findById(accountId: string) {
    const a = new ObjectId(accountId);
    const account = await this.findByEmail('anke522@163.com');
    const eccount = await this.repository.find({ id: a });
    return eccount;
  }
  findByEmail(email: string) {
    return this.repository.findOne({ email });
  }
  update(user: Account) {
    return this.repository.update(user.id, user);
  }
  search(limit = 15, page = 1, keyword: string) {
    const where = {};
    if (keyword.length > 0) {
      Object.assign(where, {
        $or: [
          { email: new RegExp(keyword, 'i') },
          { username: new RegExp(keyword, 'i') }
        ]
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
