import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('analytics')
@UseGuards(JwtAuthGuard)
export class AnalyticsController {
  constructor(private analyticsService: AnalyticsService) {}

  @Get('geo-score')
  async getGeoScore(
    @Query('brandId') brandId: string,
    @Query('range') range: string
  ) {
    return this.analyticsService.getGeoScore(brandId, range);
  }

  @Get('share-of-voice')
  async getShareOfVoice(@Query('brandId') brandId: string) {
    return this.analyticsService.getShareOfVoice(brandId);
  }

  @Get('visibility-trend')
  async getVisibilityTrend(
    @Query('brandId') brandId: string,
    @Query('days') days: number = 30
  ) {
    return this.analyticsService.getVisibilityTrend(brandId, days);
  }
}
