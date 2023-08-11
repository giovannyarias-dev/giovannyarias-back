import { Company } from "src/companies/entities/company.entity";
import { Project } from "src/projects/entities/project.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Job {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('text')
  name: string;

  @Column('date')
  startDate: string;

  @Column('date', { nullable: true })
  endDate?: string;

  @OneToMany(() => Project, (project) => project.job, { cascade: true })
  projects: Project[]

  @ManyToOne(() => Company, (company) => company.job)
  @JoinColumn()
  company: Company

  @Column('text', { nullable: true })
  description?: string;

}
