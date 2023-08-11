import { Company } from "src/companies/entities/company.entity";
import { Job } from "src/jobs/entities/job.entity";
import { Tool } from "src/tools/entities/tool.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Project {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('text', { unique: true })
  name: string;

  @Column('date')
  startDate: string;

  @Column('date', { nullable: true })
  endDate?: string;

  @Column('text', { nullable: true })
  description: string;

  @ManyToMany(() => Tool, (tool) => tool.projects, { cascade: true })
  @JoinTable()
  tools: Tool[]

  @ManyToMany(() => Company, (company) => company.projects, { cascade: true })
  @JoinTable()
  customers: Company[]

  @ManyToOne(() => Job, (job) => job.projects)
  job: Job
  
}
