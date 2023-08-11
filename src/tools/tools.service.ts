import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Repository } from 'typeorm';

import { CreateToolDto } from './dto/create-tool.dto';
import { UpdateToolDto } from './dto/update-tool.dto';
import { Tool } from './entities/tool.entity';

@Injectable()
export class ToolsService {

  private readonly logger = new Logger('ToolsService')

  constructor(
    @InjectRepository(Tool) private readonly toolRepository: Repository<Tool>
  ) {}

  async create(createToolDto: CreateToolDto) {
    try {
      const tool = this.toolRepository.create(createToolDto)
      await this.toolRepository.save(tool)
      return tool
    } catch (error) {
      this.handleDbExceptions(error)
    }
  }

  findAll(paginationDto: PaginationDto) {
    const {limit = 100, offset = 0} = paginationDto
    return this.toolRepository.find({
      take: limit,
      skip: offset,
      order: {
        name: "ASC"
      }
    });
  }

  async findOne(id: number) {
    const tool = await this.toolRepository.findOneBy({ id });
    if(!tool)
      throw new NotFoundException(`Tool with id ${id} not found`)
    return tool;
  }

  async update(id: number, updateToolDto: UpdateToolDto) {
    const tool = await this.toolRepository.preload({ 
      id, ...updateToolDto 
    })

    if(!tool) throw new NotFoundException(`Tool with id ${id} not found`)

    try {
      return this.toolRepository.save(tool)
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
