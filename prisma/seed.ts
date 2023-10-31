import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const password = await hash("Off21279", 12);
  const user = await prisma.user.upsert({
    where: { email: "aryoff@infomedia.smg" },
    update: {},
    create: {
      email: "aryoff@infomedia.smg",
      name: "Aryo Fajar",
      password,
    },
  });
  console.log({ user });
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
