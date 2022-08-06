import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('histories')
class History {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  amount: number;

  @Column()
  user_id: string;

  @Column()
  type: string;

  @Column()
  total_before: number;

  @Column()
  total_after: number;

  @Column()
  user_id_transfer: string;

  @CreateDateColumn()
  created_at: Date;
}

export default History;
