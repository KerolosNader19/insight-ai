import { Controller, Get, Query } from '@nestjs/common';
import { BrandsService } from './brands.service';

@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Get()
  findAll(@Query('organizationId') orgId: string) {
    return this.brandsService.findAll(orgId);
  }
}
