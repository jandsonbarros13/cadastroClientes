import { FastifyRequest, FastifyReply } from "fastify"; // Importa os tipos FastifyRequest e FastifyReply do Fastify
import { DeleteCustomerService } from "../services/DeleteCustomerService"; // Importa o serviço DeleteCustomerService

// Define a classe DeleteCustomerControlers que contém o método handle para lidar com a exclusão de clientes
class DeleteCustomerControlers {
  // Método handle que recebe a requisição (request) e a resposta (reply) do Fastify
  async handle(request: FastifyRequest, reply: FastifyReply) {
    // Extrai o id do cliente da query da requisição
    const { id } = request.query as { id: string };

    // Cria uma instância do serviço DeleteCustomerService
    const customerService = new DeleteCustomerService();

    // Chama o método execute do serviço DeleteCustomerService para excluir o cliente pelo id
    const customer = await customerService.execute({ id });

    // Envia a resposta com o resultado da exclusão do cliente
    reply.send(customer);
  }
}

// Exporta a classe DeleteCustomerControlers para ser utilizada em outros arquivos
export { DeleteCustomerControlers };
