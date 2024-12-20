import fastify from "fastify";
import userRoutes from "./routes/userRoutes.js";

const app = fastify({
  logger: true,
});

app.register(userRoutes);

app
  .listen({ port: 3333 })
  .then(() => {
    app.log.debug(`Servidor rodando na porta ${app.server.address}`);
  })
  .catch((err) => {
    app.log.error(err);
  });
