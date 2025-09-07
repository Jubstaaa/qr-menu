import {
  PipeTransform,
  Injectable,
  BadRequestException,
  Logger,
} from "@nestjs/common";
import { ZodSchema } from "zod";

@Injectable()
export class ZodRequestValidationPipe implements PipeTransform {
  private readonly logger = new Logger(ZodRequestValidationPipe.name);

  constructor(private schema: ZodSchema<any>) {}

  transform(value: any) {
    const result = this.schema.safeParse(value);

    if (!result.success) {
      const userFriendlyMessages = result.error.issues.map((issue) => {
        if (issue.code === "invalid_type") {
          this.logger.error(
            `Validation error: ${issue.path.join(".")} ${issue.message} ${issue.input}`
          );
          return "Geçersiz veri formatı";
        }

        return issue.message;
      });

      throw new BadRequestException({
        message: userFriendlyMessages.join("\n"),
        errors: result.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      });
    }
    return result.data;
  }
}
