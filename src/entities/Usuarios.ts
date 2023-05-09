import { Column, Entity, PrimaryGeneratedColumn,Unique } from 'typeorm';

@Entity('usuarios', { schema: 'db' })
export class Usuarios {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'nome', length: 45 })
  nome: string;
  @Column('varchar', { name: 'senha', length: 120})
  senha: string;

  @Column('varchar', { name: 'email', length: 45,unique:true })
 
  email: string;

  @Column('varchar', { name: 'numero', length: 45 })
  numero: string;

  @Column('datetime', {
    name: 'data_criacao',
    default: () => 'CURRENT_TIMESTAMP',
  })
  dataCriacao: Date;

  @Column('tinyint', { name: 'excluido', default: () => "'0'" })
  excluido: number;

  @Column('tinyint', { name: 'ativo', default: () => "'1'" })
  ativo: number;

  @Column('datetime', {
    name: 'data_atualizacao',
    default: () => 'CURRENT_TIMESTAMP',
  })
  dataAtualizacao: Date;
}
