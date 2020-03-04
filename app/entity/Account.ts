import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';
import { AuditEntity } from './AuditEntity';

export class AccountMembers {
  @Column()
  accountId: ObjectID;
  @Column()
  name: string;
  @Column()
  email: string;
}

@Entity()
export class Account extends AuditEntity {
  @ObjectIdColumn()
  id: ObjectID;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  email: string;

  @Column()
  passsalt: string;

  @Column()
  role: string;

  @Column()
  teamId: string;
}
