import prismaClient from "../prisma"; // Importa o cliente Prisma

// Define a classe DeleteCustomerService que contém a lógica para excluir um cliente
class DeleteCustomerService {
  // Método execute que recebe um objeto com a propriedade id para excluir um cliente
  async execute({ id }: DeleteCustomerProps) {
    // Verifica se o id foi fornecido
    if (!id) {
      throw new Error("Solicitação inválida: o ID do cliente é necessário.");
    }

    // Procura o cliente pelo id usando o Prisma
    const findCustomer = await prismaClient.customer.findFirst({
      where: {
        id: id,
      },
    });

    // Se o cliente não for encontrado, lança um erro informando que o cliente não existe
    if (!findCustomer) {
      throw new Error("Cliente não encontrado!");
    }

    // Se o cliente for encontrado, exclui o cliente usando o Prisma
    await prismaClient.customer.delete({
      where: {
        id: findCustomer.id,
      },
    });

    // Retorna uma mensagem de sucesso após excluir o cliente
    return { message: "Cliente excluído com sucesso." };
  }
}

// Exporta a classe DeleteCustomerService para ser utilizada em outros arquivos
export { DeleteCustomerService };
