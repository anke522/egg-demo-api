import { CreateDateColumn, UpdateDateColumn, Column } from 'typeorm';

export class AuditEntity {
  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @Column({ default: false })
  deleted: boolean;
}
