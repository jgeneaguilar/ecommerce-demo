import fastify from 'fastify';

const server = fastify();
const port = 3000;

server.get('/', async () => {
  return 'Hello World!';
});

server.listen({ port }, () => {
  console.info(`Server ready at port: ${port}`);
});

export default server;
