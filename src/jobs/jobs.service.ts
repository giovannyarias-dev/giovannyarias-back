import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompaniesService } from 'src/companies/companies.service';
import { ProjectsService } from 'src/projects/projects.service';
import { Raw, Repository } from 'typeorm';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Job } from './entities/job.entity';
import { GetJobsDto } from './dto/get-job.dto';

@Injectable()
export class JobsService {

  private readonly logger = new Logger('JobsService')

  constructor(
    @InjectRepository(Job) private readonly jobRepository: Repository<Job>,
    private projectsService: ProjectsService,
    private companiesService: CompaniesService
  ) {}

  async create(createJobDto: CreateJobDto) {
    try {

      if (createJobDto.projects) {
        createJobDto.projects = await Promise.all(
          createJobDto.projects.map(async (idProject: string) => {
            return await this.projectsService.findOne(idProject)
          })
        )
      }

      if (createJobDto.company) {
        createJobDto.company = await this.companiesService.findOne(createJobDto.company)
      }

      const job = this.jobRepository.create(createJobDto)
      await this.jobRepository.save(job)
      return job
    } catch (error) {
      this.handleDbExceptions(error)
    }
  }

  findAll(params: GetJobsDto) {

    let where: any = {};

    if(params.yearsRange) {
      const years = params.yearsRange.split(',')
      where.startDate = Raw((alias) => `${alias} BETWEEN :date1 AND :date2`, { date1: `${years[0]}-01-01`, date2: `${years[1]}-10-01` })
    }

    return this.jobRepository.find({
      where: where,
      relations: {
        projects: {
          tools: true,
          customers: true,
        },
        company: true
      },
      order: {
        startDate: "DESC"
      }
    });
  }

  async findOne(id: string) {
    const job = await this.jobRepository.findOne(
      { 
        where: { id },
        relations: {
          projects: {
            tools: true,
            customers: true,
          },
          company: true
        },
      }
    );
    if(!job)
      throw new NotFoundException(`Job with id ${id} not found`)
    console.log(job);
    return job;
  }

  async update(id: string, updateJobDto: UpdateJobDto) {
    const job = await this.jobRepository.preload({ 
      id, ...updateJobDto 
    })

    if (updateJobDto.projects) {
      job.projects = await Promise.all(
        updateJobDto.projects.map(async (idProject: string) => {
          return await this.projectsService.findOne(idProject)
        })
      )
    }

    if (updateJobDto.company) {
      updateJobDto.company = await this.companiesService.findOne(updateJobDto.company)
    }

    if(!job) throw new NotFoundException(`Job with id ${id} not found`)

    try {
      return this.jobRepository.save(job)
    } catch (error) {
      this.handleDbExceptions(error)
    }
  }

  private handleDbExceptions(error) {
    if(error.code === '23505')
      throw new BadRequestException(error.detail)

    this.logger.error(error)
    throw new InternalServerErrorException('Unexpected error, check server logs')
  }
}
