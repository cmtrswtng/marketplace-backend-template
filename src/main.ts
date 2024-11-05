import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "./pipes/validation.pipe";
import { Sequelize } from "sequelize-typescript";

async function start() {
  const PORT = process.env.PORT || 4444;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("AJAYO Backend")
    .setDescription("Документация REST API приложения")
    .setVersion("0.0.1")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/api/docs", app, document);

  if (process.env.NODE_ENV === "production") {
    app.useGlobalPipes(new ValidationPipe());
  }

  await app.listen(PORT, () => console.log("server started on port " + PORT));
}

start();
