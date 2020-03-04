import { Service, Context } from 'egg';
import { Account } from '../entity/Account';
import { getRepository, Repository, UpdateResult, ObjectID } from 'typeorm';
import { genSalt, hash } from 'bcryptjs';

export default class UserService extends Service {
  userRepository: Repository<Account>;
  constructor(ctx: Context) {
    super(ctx);
    this.userRepository = getRepository(Account);
  }
  async checkRepeat(email: string): Promise<boolean> {
    const count = await this.userRepository.count({ email });
    if (count > 0) {
      return true;
    }
    return false;
  }
  queryAll() {
    return this.userRepository.find({
      select: ['id', 'name', 'email', 'role', 'createAt', 'updateAt']
    });
  }
  async create(name: string, email: string, password: string) {
    const salt = await genSalt(10);
    const hashSalt = await hash(password, salt);
    const newUser = this.userRepository.save({
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
    const result: UpdateResult = await this.userRepository.update(
      { id },
      {
        password: hashSalt,
        passsalt: salt
      }
    );
    return result;
  }
  totalCount() {
    return this.userRepository.count();
  }
  findById(id: string) {
    return this.userRepository.find({ id });
  }
  findByEmail(email: string) {
    return this.userRepository.findOne({ email });
  }
  delete(id: string) {
    return this.userRepository.find({ id });
  }
  update(user: Account) {
    return this.userRepository.update(user.id, user);
  }
  search(keyword: string) {
    return this.userRepository.find({
      where: {
        $or: [
          { email: new RegExp(keyword, 'i') },
          { username: new RegExp(keyword, 'i') }
        ]
      },
      skip: 10
    });
  }
}
