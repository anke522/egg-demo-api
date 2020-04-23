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
export enum SubjectEnum {
  ACCOUNT = 'account',
  ORGANIZATION = 'organization',
  INTERFACE = 'interface',
  REPOSITORY = 'repository',
  OTHER = 'other',
  MODULE = 'module'
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

  @Column()
  subject: string;

  @Column()
  subjectId: string;

  @CreateDateColumn()
  createAt: Date;
}
