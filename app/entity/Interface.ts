import { AuditEntity } from './AuditEntity';
import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';
import { Property } from './Property';
@Entity()
export class Interface extends AuditEntity {
  @ObjectIdColumn()
  id: ObjectID;

  name: string;
  description: string;

  url: string;
  method: string;

  @Column()
  creatorId: number;

  @Column()
  moduleId: number;

  @Column()
  repositoryId: number;
  @Column(() => Property)
  properties: Property[];
}
