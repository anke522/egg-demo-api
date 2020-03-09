import { ObjectIdColumn, ObjectID, Column, Entity } from 'typeorm';
@Entity()
export class Notification {
  @ObjectIdColumn()
  id: ObjectID;
  @Column()
  fromId: string;
  @Column()
  toId: string;
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
