import fastify, { FastifyInstance } from 'fastify';

// Create an instance of Fastify
const server: FastifyInstance = fastify({ logger: true });

// Define a simple GET route
server.get('/health', async (_request, _reply) => {
  return { status: 'ok' };
});

// Create a start async function that launches the server
const start = async () => {
  try {
    await server.listen({ port: 3000, host: '0.0.0.0' });
    server.log.info(`Server listening on port 3000`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

// Call the start function
start();
