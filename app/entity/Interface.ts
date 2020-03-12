import { AuditEntity } from './AuditEntity';
import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';
import { Property } from './Property';
@Entity()
export class Interface extends AuditEntity {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  url: string;

  @Column()
  method: string;

  @Column()
  creatorId: string;

  @Column()
  moduleId: string;

  @Column()
  repositoryId: string;

  @Column(() => Property)
  properties: Property[];
}
