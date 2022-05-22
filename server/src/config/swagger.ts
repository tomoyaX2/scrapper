import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export const initSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Scrapper')
    .setDescription('Scrapper API schema')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
};
