import type { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../database/prisma-client.js";
import z from "zod";

export const getAllUsers = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        name: "asc",
      },
      include: { unit: true, position: true },
    });

    if (users.length === 0) {
      reply.code(404).send({ error: "A lista não possui usuários" });
      return;
    } else {
      reply.send(users);
    }
  } catch (error) {
    reply.code(500).send({ error: "Erro ao buscar usuários", message: error });
  }
};

export const getUserById = async (
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id },
      include: { unit: true, position: true },
    });

    if (!user) {
      reply.code(404).send({ error: "Usuário não encontrado" });
      return;
    }

    reply.send(user);
  } catch (error) {
    reply.code(500).send({ error: "Erro ao buscar usuário" });
  }
};

export const getUserByName = async (
  req: FastifyRequest<{ Params: { name: string } }>,
  reply: FastifyReply
) => {
  try {
    const { name } = req.params;

    const user = await prisma.user.findMany({
      orderBy: {
        name: "asc",
      },
      where: {
        name: {
          contains: name,
          mode: "insensitive",
        },
      },
      include: { unit: true, position: true },
    });

    if (!user) {
      reply.code(404).send({ error: "Usuário não encontrado" });
      return;
    }

    reply.send(user);
  } catch (error) {
    reply.code(500).send({ error: "Erro ao buscar usuário" });
  }
};

export const updateUser = async (
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    const BodySchema = z.object({
      name: z.string().min(1, "O nome é obrigatório."),
      photo_url: z.string().optional(),
      contact: z.object({
        ramal: z.string().optional(),
        phone1: z.string().min(1, "O número de contato é obrigatório."),
      }),
      email: z.string().email("O e-mail é inválido."),
      priority: z
        .number()
        .int()
        .positive("A prioridade deve ser um número inteiro positivo."),
      unit_id: z.string(),
      position_id: z.string(),
    });

    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        unit: true,
        position: true,
      },
    });

    if (!user) {
      reply.code(404).send({ error: "Usuário nao encontrado" });
      return;
    }

    const parsedBody = BodySchema.parse(req.body);
    if (!parsedBody) {
      reply.code(400).send({ error: "Dados inválidos" });
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        name: parsedBody.name,
        photo_url: parsedBody.photo_url,
        contact: parsedBody.contact,
        email: parsedBody.email,
        priority: parsedBody.priority,
        unit_id: parsedBody.unit_id,
        position_id: parsedBody.position_id,
      },
      include: {
        unit: true,
        position: true,
      },
    });

    reply
      .code(200)
      .send({ message: "Dados atualizados com sucesso!", user: updatedUser });
  } catch (err) {
    if (err instanceof z.ZodError) {
      reply
        .code(400)
        .send({ error: "Erro de validação dos dados", details: err.errors });
    } else {
      reply.code(500).send({ erro: "Erro ao atualizar os dados usuário" });
    }
  }
};

export const deleteUser = async (
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.delete({
      where: { id },
    });

    if (!user) {
      reply.code(404).send({ error: "Usuário nao encontrado" });
      return;
    }

    reply.code(200).send({ message: "Usuário deletado com sucesso!" });
  } catch (err) {
    reply.code(500).send({ error: "Erro ao deletar usuário" });
  }
};
