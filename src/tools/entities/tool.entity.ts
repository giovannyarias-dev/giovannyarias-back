import { Project } from "src/projects/entities/project.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Tool {

  @PrimaryGeneratedColumn('increment')
  id: number

  @Column('varchar', {
    unique: true
  })
  name: string;

  @Column('varchar', {
    nullable: true
  })
  urlImage: string;

  @Column('varchar', {
    nullable: true
  })
  type: string;

  @Column('integer', {
    nullable: true
  })
  rate: number;

  @Column('boolean', {
    nullable: true
  })
  favorite: boolean;

  @ManyToMany(() => Project, (project) => project.tools)
  projects: Project[]

}
