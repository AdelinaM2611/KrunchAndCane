import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const april = new Date("2025-04-12T10:00:00.000Z");
  const may = new Date("2025-05-10T10:00:00.000Z");

  await prisma.event.upsert({
    where: { id: "seed-pop-brixton-april" },
    create: {
      id: "seed-pop-brixton-april",
      name: "Pop Brixton April",
      location: "Pop Brixton, London",
      startAt: april,
      endAt: new Date(april.getTime() + 8 * 60 * 60 * 1000),
      description: "Krunch & Cane at Pop Brixton — April market.",
      status: "ACTIVE",
      imageUrl: "https://placehold.co/600x400?text=Pop+Brixton+April",
    },
    update: {},
  });

  await prisma.event.upsert({
    where: { id: "seed-pop-brixton-may" },
    create: {
      id: "seed-pop-brixton-may",
      name: "Pop Brixton May",
      location: "Pop Brixton, London",
      startAt: may,
      endAt: new Date(may.getTime() + 8 * 60 * 60 * 1000),
      description: "Krunch & Cane at Pop Brixton — May market.",
      status: "ACTIVE",
      imageUrl: "https://placehold.co/600x400?text=Pop+Brixton+May",
    },
    update: {},
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
