import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { ToolsModule } from 'src/tools/tools.module';
import { CompaniesModule } from 'src/companies/companies.module';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService],
  imports: [
    TypeOrmModule.forFeature([Project]), ToolsModule, CompaniesModule
  ],
  exports: [ProjectsService]
})
export class ProjectsModule {}
