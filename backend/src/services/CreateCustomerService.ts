// Importa o Prisma Client para interagir com o banco de dados
import prismaClient from "../prisma";
interface CreateCustomerProps {
  name: string;
  email: string;
}
// Classe responsável por fornecer serviços para criar clientes
class CreateCustomerServices {
  // Método para executar a criação de um cliente
  async execute({ name, email }: CreateCustomerProps) {
    if(!name || !email) {
      throw new Error("Preencha todos os campos");
    }
    const customer = await prismaClient.customer.create({
      data: {
        name,
        email,
        status: true
      }
    })
    return customer; // Retorna um objeto indicando sucesso
  }
}

// Exporta a classe CreateCustomerServices para uso em outros arquivos
export { CreateCustomerServices };
