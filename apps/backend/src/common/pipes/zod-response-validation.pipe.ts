import {
  PipeTransform,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { ZodSchema } from "zod";

@Injectable()
export class ZodResponseValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema<any>) {}

  transform(value: any) {
    const result = this.schema.safeParse(value);
    if (!result.success) {
      console.error("Response validation failed:", result.error.issues);
      throw new InternalServerErrorException("Response validation failed");
    }
    return result.data;
  }
}
