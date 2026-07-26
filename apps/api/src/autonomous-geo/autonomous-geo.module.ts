import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { GeoCopilotModule } from '../geo-copilot/geo-copilot.module';
import { GeoIntelligenceModule } from '../geo-intelligence/geo-intelligence.module';
import { GeoResearchModule } from '../geo-research/geo-research.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { PrismaModule } from '../prisma/prisma.module';
import { AutonomousGeoController } from './autonomous-geo.controller';
import { AutonomousGeoProcessor } from './autonomous-geo.processor';
import { AutonomousGeoService } from './autonomous-geo.service';

@Module({
  imports: [
    BullModule.registerQueue({ name: 'autonomous-geo' }),
    PrismaModule,
    NotificationsModule,
    GeoIntelligenceModule,
    GeoResearchModule,
    GeoCopilotModule,
  ],
  controllers: [AutonomousGeoController],
  providers: [AutonomousGeoService, AutonomousGeoProcessor],
  exports: [AutonomousGeoService],
})
export class AutonomousGeoModule {}
