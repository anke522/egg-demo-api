import { ObjectIdColumn, ObjectID, Column, Entity } from 'typeorm';
import { AccountMembers } from './Account';

export class OrganizationsRepository {
  @Column()
  repositoryId: string;
  @Column()
  name: string;
}
@Entity()
export class Organization {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  logo: string;

  @Column({ default: true })
  visibility: boolean;

  @Column()
  creatorId: string;

  @Column()
  ownerId: string;

  @Column(() => AccountMembers)
  organizationMembers: AccountMembers[];

  @Column(() => OrganizationsRepository)
  repositories: OrganizationsRepository[];
}
