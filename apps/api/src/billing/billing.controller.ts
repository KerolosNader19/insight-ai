import { Controller, Get, Post, Body } from '@nestjs/common';
import { BillingService } from './billing.service';

@Controller('billing')
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Get('portal')
  async getPortal(@Body() body: any) {
    return this.billingService.createPortalSession(body.customerId);
  }
}
