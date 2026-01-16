import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function testRoutes() {
  const app = await NestFactory.create(AppModule, { logger: ['verbose'] });
  
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
  } else {
    console.log('No routes registered!');
  }
  
  await app.close();
  process.exit(0);
}

testRoutes().catch(console.error);