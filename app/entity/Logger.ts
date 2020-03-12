import { ObjectIdColumn, ObjectID, Column, Entity, CreateDateColumn } from 'typeorm';

export enum LoggerType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LOCK = 'lock',
  UNLOCK = 'unlock',
  JOIN = 'join',
  EXIT = 'exit'
}
@Entity()
export class Logger {
  @ObjectIdColumn()
  id: ObjectID;
  @Column('enum', { enum: LoggerType, default: LoggerType.CREATE })
  type: LoggerType;

  @Column()
  creatorId: string;

  @Column()
  userId: string;

  @Column()
  organizationId: string;

  @Column()
  repositoryId: string;

  @Column()
  moduleId: string;

  @Column()
  interfaceId: string;

  @Column()
  content: string;

  @CreateDateColumn()
  createAt: Date;
}
