import { ObjectIdColumn, ObjectID, Column } from 'typeorm';
import { AccountMembers } from './Account';

export class OrganizationsRepository {
  @Column()
  repositoryId: ObjectID;
  @Column()
  name: string;
}

export class Organization {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  logo: string;

  @Column()
  visibility: boolean;

  @Column()
  creatorId: ObjectID;

  @Column()
  ownerId: ObjectID;

  @Column(() => AccountMembers)
  organizationMembers: AccountMembers[];

  @Column(() => OrganizationsRepository)
  repositories: OrganizationsRepository[];
}
