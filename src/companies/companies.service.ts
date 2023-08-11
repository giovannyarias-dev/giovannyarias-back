import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';

@Injectable()
export class CompaniesService {

  private readonly logger = new Logger('CompanyService')

  constructor(
    @InjectRepository(Company) private readonly companyRepository: Repository<Company>
  ) {}

  async create(createCompanyDto: CreateCompanyDto) {
    try {
      const tool = this.companyRepository.create(createCompanyDto)
      await this.companyRepository.save(tool)
      return tool
    } catch (error) {
      this.handleDbExceptions(error)
    }
  }

  findAll(paginationDto: PaginationDto) {
    const {limit = 100, offset = 0} = paginationDto
    return this.companyRepository.find({
      take: limit,
      skip: offset,
      order: {
        name: "ASC"
    }
    });
  }

  async findOne(id: number) {
    const company = await this.companyRepository.findOneBy({ id });
    if(!company)
      throw new NotFoundException(`Company with id ${id} not found`)
    return company;
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    const company = await this.companyRepository.preload({ 
      id, ...updateCompanyDto 
    })

    if(!company) throw new NotFoundException(`Company with id ${id} not found`)

    try {
      return this.companyRepository.save(company)
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
