import { AbstractService } from './AbstractService';
import { Logger, LoggerType } from '../entity/Logger';
import { Context } from 'egg';
import { In, ObjectID } from 'typeorm';
export interface ICreateLogger {
  type: LoggerType;
  content?: string;
  accountId: string;
  repositoryId?: string;
  organizationId?: string;
  moduleId?: string;
  interfaceId?: string;
}
export default class LoggerService extends AbstractService<Logger> {
  constructor(ctx: Context) {
    super(ctx, Logger);
  }
  create(params: ICreateLogger) {
    const logger = this.repository.create(params);
    return this.repository.save(logger);
  }
  queryByRepositoryIds(repositoryId: string[], limit = 30, page = 1) {
    return this.repository.find({
      where: {
        repositoryId: In([repositoryId])
      },
      skip: (page - 1) * limit,
      take: limit,
      order: {
        createAt: -1
      }
    });
  }
  queryRepository(repositoryId: ObjectID, limit = 30, page = 1) {
    return this.repository.find({
      where: {
        repositoryId
      },
      skip: (page - 1) * limit,
      take: limit,
      order: {
        createAt: -1
      }
    });
  }
}
