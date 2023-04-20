import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'resultados_premium' })
export class Result {
  @PrimaryGeneratedColumn()
    id: number

  @Column()
    cor: string

  @Column()
    roleta: string

  @Column()
    bolas_anteriores: string

  @Column()
    bolas_resultado: string

  @Column()
    estrategia: string

  @Column()
    lobby: string

  @Column()
    data: Date
}
