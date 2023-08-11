import { Job } from "src/jobs/entities/job.entity";
import { Project } from "src/projects/entities/project.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Company {

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
  country: string;

  @Column('varchar', {
    nullable: true
  })
  color: string;

  @ManyToMany(() => Project, (project) => project.customers)
  projects: Project[]

  @OneToMany(() => Job, (job) => job.company)
  job: Job
}
