import { Controller, Get, Query } from '@nestjs/common';
import { PromptsService } from './prompts.service';

@Controller('prompts')
export class PromptsController {
  constructor(private readonly promptsService: PromptsService) {}

  @Get()
  findAll(@Query('organizationId') orgId: string) {
    return this.promptsService.findAll(orgId);
  }
}
