import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsModule } from './projects/projects.module';
import { CommonModule } from './common/common.module';
import { JobsModule } from './jobs/jobs.module';
import { ToolsModule } from './tools/tools.module';
import { CompaniesModule } from './companies/companies.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      ssl: process.env.STAGE === 'prod',
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
      dropSchema: false,
      logging: true,
    }),
    ProjectsModule,
    CommonModule,
    JobsModule,
    ToolsModule,
    CompaniesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
