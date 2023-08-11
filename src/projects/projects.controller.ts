import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Query } from '@nestjs/common';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.projectsService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.projectsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() updateProjectDto: UpdateProjectDto
  ) {
    return this.projectsService.update(id, updateProjectDto);
  }

}
