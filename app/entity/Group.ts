/* eslint-disable comma-dangle */
import {
  Entity,
  ObjectID,
  ObjectIdColumn,
  Column,
  VersionColumn
} from 'typeorm';
import { AuditEntity } from './AuditEntity';

export enum KindEnum {
  PUBLIC = 'public',
  PRIVATE = 'private'
}
export enum GroupMemberRoleEnum {
  OWNER = 'owner',
  DEV = 'dev',
  GUEST = 'guest'
}
export class GroupMember {
  @Column()
  accountId: ObjectID;
  @Column()
  name: string;
  @Column()
  email: string;
  @Column('enum', {
    enum: GroupMemberRoleEnum,
    default: GroupMemberRoleEnum.OWNER
  })
  role: GroupMemberRoleEnum;
}

@Entity()
export class Group extends AuditEntity {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  userId: number;

  @Column()
  name: string;

  @Column('enum', { enum: KindEnum, default: KindEnum.PUBLIC })
  kind: KindEnum;

  @Column()
  member: GroupMember[];

  @VersionColumn()
  version: number;
}
