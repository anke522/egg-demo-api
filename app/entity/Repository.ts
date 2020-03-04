import { Column, ObjectID, ObjectIdColumn, Entity } from 'typeorm';
import { AccountMembers } from './Account';
import { Module } from './Module';

export class RepositoryMember {
  @Column()
  userId: string;

  @Column()
  repositoryId: string;
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
  ownerId: ObjectID;

  @Column()
  organizationId: ObjectID;

  @Column()
  creatorId: ObjectID;

  @Column()
  lockerId: ObjectID;

  @Column(() => AccountMembers)
  members: AccountMembers[];

  @Column(() => Module)
  modules: Module[];
}
