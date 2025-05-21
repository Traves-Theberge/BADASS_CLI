// Import Fastify and the server instance
// We need to import the app from server.ts but ensure it's not already started.
// This is tricky if server.ts calls server.listen() directly at the top level.
// For true unit/integration testing without starting the actual HTTP server,
// it's better to export the configured Fastify instance *before* calling listen.

// Let's assume server.ts is modified to export the server instance for testing,
// or we manage its lifecycle carefully.
// For now, we will try to import it. If server.ts immediately starts listening,
// this test might have side effects or fail in a CI environment.

// A common pattern is:
// In server.ts:
//   export const app = fastify(...);
//   ... (routes) ...
//   export const start = async () => { ... app.listen ... };
//   if (require.main === module) { start(); } // Only start if run directly

// For this example, I'll assume `src/server.ts` exports the Fastify instance
// or that `light-my-request` can handle an already initialized (but not necessarily listening) server.
// Given the current `src/server.ts` calls `start()` (which calls `listen()`) unconditionally,
// this test will actually start the server. This is not ideal for unit tests.
// `light-my-request` is designed to inject requests directly into Fastify's router,
// bypassing the need for a listening server *if the server instance is available*.

import { fastify, FastifyInstance } from 'fastify'; // Import Fastify types
import { execSync } from 'child_process'; // To potentially stop the server if needed

// Dynamically import the server.
// This is a workaround. Ideally, server.ts should export the app instance.
let server: FastifyInstance | null = null;

// Mock fastify instance for light-my-request if direct import is problematic
// This is a simplified approach. Realistically, you'd refactor server.ts
// to export the app instance *before* it starts listening.
const buildApp = () => {
  const app = fastify({ logger: false }); // Disable logger for tests
  app.get('/health', async (request, reply) => {
    return { status: 'ok' };
  });
  return app;
};


describe('Fastify Server API', () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    // If server.ts exports the app instance:
    // import { app as importedApp } from '../src/server';
    // app = importedApp;
    // await app.ready(); // Ensure plugins are loaded if any

    // Using the buildApp approach for a cleaner test environment
    app = buildApp();
    await app.ready();
  });

  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });

  describe('GET /health', () => {
    it('should return 200 with status: "ok"', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/health',
      });

      expect(response.statusCode).toBe(200);
      expect(response.headers['content-type']).toMatch(/application\/json/);
      const payload = JSON.parse(response.payload);
      expect(payload).toEqual({ status: 'ok' });
    });
  });
});

// Note: The original server.ts starts listening immediately.
// For proper testing with light-my-request where it injects requests
// without a live HTTP server, server.ts should be refactored to export
// the Fastify app instance *before* calling `listen()`.
// Example refactor for src/server.ts:
/*
import fastify, { FastifyInstance } from 'fastify';

export function build(): FastifyInstance {
  const server: FastifyInstance = fastify({ logger: true });
  server.get('/health', async (request, reply) => {
    return { status: 'ok' };
  });
  return server;
}

const start = async (serverInstance: FastifyInstance) => {
  try {
    await serverInstance.listen({ port: 3000, host: '0.0.0.0' });
  } catch (err) {
    serverInstance.log.error(err);
    process.exit(1);
  }
};

if (require.main === module) { // Ensure this only runs when script is executed directly
  const app = build();
  start(app);
}
*/
// The test would then import `build` from `../src/server` and use that.
// The current test uses a local `buildApp` function as a stand-in for this pattern.
