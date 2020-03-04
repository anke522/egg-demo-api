import { ObjectIdColumn, ObjectID, Column } from 'typeorm';

enum LoggerType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LOCK = 'lock',
  UNLOCK = 'unlock',
  JOIN = 'join',
  EXIT = 'exit'
}

export class Logger {
  @ObjectIdColumn()
  id: ObjectID;
  @Column('enum', { enum: LoggerType, default: LoggerType.CREATE })
  type: LoggerType;

  @Column()
  creatorId: ObjectID;

  @Column()
  userId: ObjectID;

  @Column()
  organizationId: ObjectID;

  @Column()
  repositoryId: ObjectID;

  @Column()
  moduleId: ObjectID;

  @Column()
  interfaceId: ObjectID;
}
