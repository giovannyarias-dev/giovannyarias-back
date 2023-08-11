import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from './entities/job.entity';
import { ProjectsModule } from 'src/projects/projects.module';
import { CompaniesModule } from 'src/companies/companies.module';

@Module({
  controllers: [JobsController],
  providers: [JobsService],
  imports: [
    TypeOrmModule.forFeature([Job]), ProjectsModule, CompaniesModule
  ]
})
export class JobsModule {}
