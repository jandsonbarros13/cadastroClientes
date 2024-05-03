import prismaClient from "../prisma";

// Classe responsável por listar os clientes
class ListCustomerService {
  // Método assíncrono para executar a listagem dos clientes
  async execute() {
    // Utiliza o Prisma para buscar todos os clientes no banco de dados
    const customers = await prismaClient.customer.findMany();

    // Retorna a lista de clientes obtida do banco de dados
    return customers;
  }
}

// Exporta a classe ListCustomerService para que ela possa ser utilizada em outros módulos
export { ListCustomerService };
