import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function start() {
  const PORT = process.env.PORT || 4444;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("AJAYO Backend")
    .setDescription("Документация REST API приложения")
    .setVersion("0.0.1")
    .addTag("mostlyplacebo")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/api/document", app, document);

  await app.listen(PORT, () => console.log("server started on port " + PORT));
}

start();
