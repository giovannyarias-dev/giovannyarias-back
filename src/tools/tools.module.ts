import { Module } from '@nestjs/common';
import { ToolsService } from './tools.service';
import { ToolsController } from './tools.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tool } from './entities/tool.entity';

@Module({
  controllers: [ToolsController],
  providers: [ToolsService],
  imports: [
    TypeOrmModule.forFeature([Tool])
  ],
  exports:[ToolsService]
})
export class ToolsModule {}
