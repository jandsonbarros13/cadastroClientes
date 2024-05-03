// Importa o PrismaClient do pacote '@prisma/client'
import { PrismaClient } from "@prisma/client";

// Cria uma instância do PrismaClient
const prismaClient = new PrismaClient();

// Exporta a instância do PrismaClient como padrão para ser usada em outros módulos
export default prismaClient;
