import { Injectable } from "@nestjs/common";

@Injectable()
export class SubscriptionService {
  async getSubscriptionInfo() {
    // TODO: Implement actual subscription logic
    return {
      plan: "free",
      status: "active",
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    };
  }
}
