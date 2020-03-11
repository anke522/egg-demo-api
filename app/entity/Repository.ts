import { Column, ObjectID, ObjectIdColumn, Entity } from 'typeorm';
import { AccountMembers } from './Account';
import { Module } from './Module';

export class RepositoryMember {
  @Column()
  userId: string;

  @Column()
  email: string;
}

@Entity()
export class Repository {
  @ObjectIdColumn()
  id: ObjectID;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  description: string;

  @Column()
  logo: string;
  @Column({ default: true })
  visibility: boolean;

  @Column()
  ownerId: string;

  @Column()
  organizationId: string;

  @Column()
  creatorId: string;

  @Column()
  lockerId: string;

  @Column(() => AccountMembers)
  members: AccountMembers[];

  @Column(() => Module)
  modules: Module[];
}
