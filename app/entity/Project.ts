import { Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class Project {
  @ObjectIdColumn()
  id: ObjectID;
}
