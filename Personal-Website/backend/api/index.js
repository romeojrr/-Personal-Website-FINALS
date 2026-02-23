// Vercel Serverless Entry Point for NestJS
// This file wraps the NestJS app as a Vercel serverless function

const { NestFactory } = require('@nestjs/core');
const { AppModule } = require('../dist/app.module');

let cachedApp;

async function getApp() {
  if (!cachedApp) {
    const app = await NestFactory.create(AppModule, { logger: ['error', 'warn'] });
    app.enableCors({
      origin: true,
      credentials: true,
    });
    await app.init();
    cachedApp = app;
  }
  return cachedApp;
}

module.exports = async (req, res) => {
  const app = await getApp();
  const instance = app.getHttpAdapter().getInstance();
  instance(req, res);
};
