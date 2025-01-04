import type { FastifyInstance, FastifyReply } from "fastify";
import {
  getAllUsers,
  getUserById,
  getUserByName,
  updateUser,
} from "../controllers/userController.js";
import { authMiddleware } from "../middleware/auth-middleware.js";

export default async (app: FastifyInstance) => {
  // app.addHook("preHandler", authMiddleware);

  app.get("/", (req, reply: FastifyReply) => {
    reply.send({ message: "Teste funcionando!" });
  });
  app.get("/users", getAllUsers);
  app.get<{ Params: { name: string } }>("/users/:name", getUserByName);
  app.get<{ Params: { id: string } }>("/users/by-id/:id", getUserById);
  app.put<{ Params: { id: string } }>("/users/:id", updateUser);
  app.delete<{ Params: { id: string } }>("/users/:id", updateUser);
};
