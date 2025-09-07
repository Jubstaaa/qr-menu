import {
  PipeTransform,
  Injectable,
  InternalServerErrorException,
  BadRequestException,
  Logger,
} from "@nestjs/common";
import { ZodSchema } from "zod";

@Injectable()
export class ZodResponseValidationPipe implements PipeTransform {
  private readonly logger = new Logger(ZodResponseValidationPipe.name);

  constructor(private schema: ZodSchema<any>) {}

  transform(value: any) {
    const result = this.schema.safeParse(value);

    if (!result.success) {
      const userFriendlyMessages = result.error.issues.map((issue) => {
        if (issue.code === "invalid_type" || issue.code === "invalid_union") {
          this.logger.error(
            `Response validation error: ${issue.path.join(".")} ${issue.message} ${issue.input}`
          );
          return "Geçersiz Dönüş veri formatı";
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
