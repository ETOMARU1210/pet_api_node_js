const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const pet = await prisma.pet.upsert({
    where: { id: 1 },
    update: {},
    create: {
      category: {
        create: {
          name: "string",
        },
      },
      name: "doggie",
      photoUrls: {
        create: [{ photoUrl: "string" }],
      },
      tags: {
        create: [
          {
            name: "string",
          },
        ],
      },
      status: "sold",
    },
  });
  console.log({ pet });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
