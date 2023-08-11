import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ToolsService } from './tools.service';
import { CreateToolDto } from './dto/create-tool.dto';
import { UpdateToolDto } from './dto/update-tool.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('tools')
export class ToolsController {
  constructor(private readonly toolsService: ToolsService) {}

  @Post()
  create(@Body() createToolDto: CreateToolDto) {
    return this.toolsService.create(createToolDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.toolsService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.toolsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateToolDto: UpdateToolDto) {
    return this.toolsService.update(+id, updateToolDto);
  }

}
