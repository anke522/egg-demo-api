import { ObjectIdColumn, ObjectID, Column } from 'typeorm';

export class Notification {
  @ObjectIdColumn()
  id: ObjectID;
  @Column()
  fromId: ObjectID;
  @Column()
  toId: ObjectID;
  @Column()
  type: string;
  @Column()
  param1: string;
  @Column()
  param2: string;
  @Column()
  param3: string;
  @Column({ default: false })
  readed: boolean;
}
