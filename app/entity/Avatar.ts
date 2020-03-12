import { Entity, ObjectIdColumn, Column } from 'typeorm';

@Entity()
export class Avatar {
  @ObjectIdColumn()
  id: string;

  @Column()
  basecode: string;

  @Column()
  type: string;
}
