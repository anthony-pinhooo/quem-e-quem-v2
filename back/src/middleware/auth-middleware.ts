import type { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authMiddleware = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      reply.code(401).send({ error: "Token não fornecido" });
      return;
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    request.user = decoded;
  } catch (error) {
    reply.code(401).send({ error: "Token inválido" });
  }
};
