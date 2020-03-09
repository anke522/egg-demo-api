import { Entity, ObjectIdColumn, Column, ObjectID } from 'typeorm';

@Entity()
export class Module {
  @ObjectIdColumn()
  id: ObjectID;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false, default: 1 })
  priority: number;

  @Column()
  creatorId: string;

  @Column()
  repositoryId: string;

  @Column()
  interface: string[];
}
