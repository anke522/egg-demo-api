import { Entity, ObjectIdColumn, Column } from 'typeorm';

@Entity()
export class Avatar {
  @ObjectIdColumn()
  id: string;
  @Column()
  accountId: string;
  @Column()
  basecode: string;

  @Column()
  type: string;
}
