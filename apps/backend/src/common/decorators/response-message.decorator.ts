import { SetMetadata } from "@nestjs/common";

export const SetResponseMessage = (message: string) =>
  SetMetadata("responseMessage", message);
