import { Controller, Get, UseInterceptors } from "@nestjs/common";
import { SubscriptionService } from "./subscription.service";
import { TransformInterceptor } from "../../../common/interceptors/transform.interceptor";

@Controller("admin/subscription")
@UseInterceptors(TransformInterceptor)
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Get()
  async getSubscriptionInfo() {
    return this.subscriptionService.getSubscriptionInfo();
  }
}
