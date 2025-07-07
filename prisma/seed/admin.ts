import { prisma } from "../../src/prisma/client";

async function SeedAdmin() {
  const admincreated = await prisma.authorization.create({
    data: {
      email: "lucaspazito@gmail.com",
      password: "admin",
      role: "admin"
    }
  });

  await prisma.professor.create({
    data: {
      nome: "Lucas Pazito Miguel Abel",
      email: "lucaspazito@gmail.com",
      createdAt: new Date(),
      authId: admincreated.id
    }
  })
}

SeedAdmin().then(() => {
  console.log("Admin created!");
});

export default SeedAdmin;