import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  
  // Get all registered routes
  const server = app.getHttpServer();
  const router = server._events.request._router;
  
  console.log('\n=== REGISTERED ROUTES ===');
  if (router && router.stack) {
    router.stack.forEach((layer) => {
      if (layer.route) {
        const methods = Object.keys(layer.route.methods).join(',').toUpperCase();
        console.log(`${methods.padEnd(6)} ${layer.route.path}`);
      }
    });
  }
  
  const port = 4000;
  await app.listen(port);
  console.log(`\n🚀 Server running on http://localhost:${port}`);
}
bootstrap();