import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe, BadRequestException } from "@nestjs/common";
import { config } from "@qr-menu/shared-config";
import { AllExceptionsFilter } from "./common/filters/all-exceptions.filter";
import { TransformInterceptor } from "./common/interceptors/transform.interceptor";
import cookieParser from "cookie-parser";
import { Reflector } from "@nestjs/core";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Cookie parser middleware
  app.use(cookieParser());

  // Global exception filter
  app.useGlobalFilters(new AllExceptionsFilter());

  app.useGlobalInterceptors(new TransformInterceptor(app.get(Reflector)));

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors) => {
        const messages = errors
          .map((error) => Object.values(error.constraints || {}).join("\n"))
          .join("\n");
        return new BadRequestException(messages);
      },
    })
  );

  // CORS configuration
  app.enableCors({
    origin: function (origin: string | undefined, callback: any) {
      if (!origin) return callback(null, true);

      const allowedDomains = [
        "localhost:3000",
        "localhost:3024",
        config.BASE_DOMAIN,
      ];

      const isAllowed = allowedDomains.some((domain) => {
        if (origin === `https://${domain}` || origin === `http://${domain}`) {
          return true;
        }
        if (origin.includes(`.${domain}`)) {
          return true;
        }
        return false;
      });

      if (isAllowed) {
        return callback(null, true);
      }

      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  });

  const port = config.PORT;
  await app.listen(port);
  console.log(`🚀 Server running on port ${port}`);
}

bootstrap();
