import { NestFactory } from '@nestjs/core';
import { SeederModule } from './seeder.module';
import { SeederService } from './seeder.service';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(SeederModule);
  const seeder = appContext.get(SeederService);

  const modulesToSeed = process.argv.slice(2); // e.g., npm run seed admin
  await seeder.seed(modulesToSeed);

  await appContext.close();
}
bootstrap();
