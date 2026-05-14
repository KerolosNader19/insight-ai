import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);

  constructor(private prisma: PrismaService) {}

  /**
   * Dispatches notifications across multiple channels.
   */
  async sendNotification(userId: string, type: string, content: any) {
    this.logger.log(`Dispatching ${type} notification to user ${userId}`);
    
    // 1. Store in-app notification
    // await this.prisma.notification.create({ ... });

    // 2. Dispatch Email (Mocked)
    await this.dispatchEmail(userId, type, content);
    
    // 3. Dispatch Push/Webhook if needed
  }

  private async dispatchEmail(userId: string, type: string, content: any) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) return;

    // Simulation of email dispatching (e.g. via Resend or SendGrid)
    console.log(`[Email] Sending ${type} to ${user.email} with content: ${JSON.stringify(content)}`);
  }

  /**
   * Strategic Retention Alert: Competitor Spike
   */
  async notifyCompetitorSpike(brandId: string, competitorName: string, increase: number) {
    const brand = await this.prisma.brand.findUnique({ 
      where: { id: brandId },
      include: { organization: { include: { members: { include: { user: true } } } } }
    });

    if (!brand) return;

    for (const member of brand.organization.members) {
      await this.sendNotification(member.user.id, 'COMPETITOR_SPIKE', {
        brandName: brand.name,
        competitorName,
        increase: `${increase}%`,
        insight: `Critical: ${competitorName} visibility increased significantly on Perplexity.`
      });
    }
  }
}
