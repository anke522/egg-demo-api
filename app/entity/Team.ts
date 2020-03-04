import { AuditEntity } from './AuditEntity';
import { ObjectID, ObjectIdColumn, Column } from 'typeorm';

export class Team extends AuditEntity {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  creator: ObjectID;

  @Column()
  members: ObjectID[];
}
