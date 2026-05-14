import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { BrandsModule } from './brands/brands.module';
import { PromptsModule } from './prompts/prompts.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { TrackingModule } from './tracking/tracking.module';
import { BillingModule } from './billing/billing.module';
import { BullModule } from '@nestjs/bullmq';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT) || 6379,
      },
    }),
    AuthModule,
    OrganizationsModule,
    BrandsModule,
    PromptsModule,
    AnalyticsModule,
    TrackingModule,
    BillingModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
