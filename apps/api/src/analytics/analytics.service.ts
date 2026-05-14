import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AnalyticsService {
  constructor(private prisma: PrismaService) {}

  async getDashboardStats(orgId: string) {
    return {
      totalMentions: await this.prisma.mention.count(),
      totalCitations: await this.prisma.citation.count(),
    };
  }

  async getGeoScore(brandId: string, range: string) {
    return { brandId, score: 75.5, trend: 'up' };
  }

  async getShareOfVoice(brandId: string) {
    return { brandId, share: 0.25 };
  }

  async getVisibilityTrend(brandId: string, days: number) {
    return [];
  }
}
