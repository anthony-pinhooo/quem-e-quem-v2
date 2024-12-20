import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Criar unidades
  const units = await prisma.unit.createMany({
    data: [
      {
        name: "NTIC",
        description: "Núcleo de Técnologia da Informação e Comunicação",
        floor: "2º Andar",
      },
      {
        name: "USO",
        description: "Unidade de Suporte Operacional",
        floor: "2º Andar",
      },
    ],
  });

  console.log("Unidades criadas:", units);

  // Criar posições
  const positions = await prisma.position.createMany({
    data: [
      { name: "Gerente" },
      { name: "Funcionário" },
      { name: "Terceirizado" },
      { name: "Estagiário" },
      { name: "Jovem Aprendiz" },
    ],
  });

  console.log("Posições criadas:", positions);

  // Criar usuários
  const users = await prisma.user.createMany({
    data: [
      {
        name: "João Silva",
        photo_url: "https://randomuser.me/api/portraits/men/1.jpg",
        contact: JSON.stringify({ phone: "+55 11 98765-4321" }),
        email: "joao.silva@example.com",
        priority: 1,
        unit_id: "unit1",
        position_id: "pos1",
      },
      {
        name: "Maria Oliveira",
        photo_url: "https://randomuser.me/api/portraits/women/2.jpg",
        contact: JSON.stringify({ phone: "+55 21 91234-5678" }),
        email: "maria.oliveira@example.com",
        priority: 2,
        unit_id: "unit1",
        position_id: "pos2",
      },
      {
        name: "Carlos Pereira",
        photo_url: "https://randomuser.me/api/portraits/men/3.jpg",
        contact: JSON.stringify({ phone: "+55 31 99876-5432" }),
        email: "carlos.pereira@example.com",
        priority: 3,
        unit_id: "unit2",
        position_id: "pos3",
      },
    ],
  });

  console.log("Usuários criados:", users);
}

main()
  .then(() => {
    console.log("Seed finalizada!");
  })
  .catch((e) => {
    console.error("Erro ao executar a seed:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
