import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'result_aviator' })
export class Aviator {
  @PrimaryGeneratedColumn()
    id: number

  @Column()
    color: string

  @Column()
    input_value: string

  @Column()
    output_value: string

  @Column()
    time_message: Date
}
