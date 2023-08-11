import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { CompaniesService } from 'src/companies/companies.service';
import { ToolsService } from 'src/tools/tools.service';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectsService {

  private readonly logger = new Logger('ProductsService')

  constructor(
    @InjectRepository(Project) private readonly projectRepository: Repository<Project>,
    private toolsService: ToolsService,
    private companiesService: CompaniesService
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    try {

      if (createProjectDto.tools) {
        createProjectDto.tools = await Promise.all(
          createProjectDto.tools.map(async (idTool: number) => {
            return await this.toolsService.findOne(idTool)
          })
        )
      }
      
      if (createProjectDto.customers) {
        createProjectDto.customers = await Promise.all(
          createProjectDto.customers.map(async (idCustomer: number) => {
            return await this.companiesService.findOne(idCustomer)
          })
        )
      }

      const project = this.projectRepository.create(createProjectDto)
      await this.projectRepository.save(project)
      return project
    } catch (error) {
      this.handleDbExceptions(error)
    }
  }

  findAll(paginationDto: PaginationDto) {
    const {limit = 10, offset = 0} = paginationDto
    return this.projectRepository.find({
      take: limit,
      skip: offset,
      relations: {
        tools: true,
        customers: true
      },
    });
  }

  async findOne(id: string) {
    const project = await this.projectRepository.findOne(
      { 
        where: { id },
        relations: {
          tools: true,
          customers: true
        },
      }
    );
    if(!project)
      throw new NotFoundException(`Project with id ${id} not found`)
    return project;
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    const project = await this.projectRepository.preload({ 
      id, ...updateProjectDto 
    })

    if (updateProjectDto.tools) {
      project.tools = await Promise.all(
        updateProjectDto.tools.map(async (idTool: number) => {
          return await this.toolsService.findOne(idTool)
        })
      )
    }
    
    if (updateProjectDto.customers) {
      project.customers = await Promise.all(
        updateProjectDto.customers.map(async (idCustomer: number) => {
          return await this.companiesService.findOne(idCustomer)
        })
      )
    }

    if(!project) throw new NotFoundException(`Project with id ${id} not found`)

    try {
      return this.projectRepository.save(project)
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
