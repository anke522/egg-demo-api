import { AuditEntity } from './AuditEntity';
import { ObjectID, ObjectIdColumn, Column, Entity } from 'typeorm';
export enum SecretLevelEnum {
  PUBLIC = 'public',
  PRIVATE = 'private'
}
export enum TeamMemberRoleEnum {
  OWNER = 'owner',
  DEV = 'dev',
  GUEST = 'guest'
}

export class TeamMember {
  @Column()
  accountId: string;
  @Column()
  name: string;
  @Column()
  description: string;
  @Column('enum', {
    enum: TeamMemberRoleEnum,
    default: TeamMemberRoleEnum.OWNER
  })
  role: TeamMemberRoleEnum;
  constructor(
    accountId?: string,
    description?: string,
    role: TeamMemberRoleEnum = TeamMemberRoleEnum.OWNER
  ) {
    this.accountId = accountId!;
    this.role = role;
    this.description = description!;
  }
}
@Entity()
export class Team extends AuditEntity {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  creator: string;

  @Column('enum', { enum: SecretLevelEnum, default: SecretLevelEnum.PUBLIC })
  secret: SecretLevelEnum;
  @Column()
  members: TeamMember[];
}
