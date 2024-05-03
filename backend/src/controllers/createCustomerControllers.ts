import { FastifyRequest, FastifyReply } from "fastify";
import { CreateCustomerServices } from "../services/CreateCustomerService";

// Classe responsável por controlar a criação de clientes
class CreateCustomerController {
  // Método assíncrono para lidar com a requisição de criação de cliente
  async handle(request: FastifyRequest, reply: FastifyReply) {
    // Extrai os dados de nome e email do corpo da requisição e define seus tipos
    const { name, email } = request.body as { name: string; email: string };

    try {
      // Cria uma instância do serviço CreateCustomerServices para criar um cliente
      const customerService = new CreateCustomerServices();

      // Executa o serviço para criar um cliente com os dados fornecidos
      const customer = await customerService.execute({ name, email });

      // Retorna uma resposta de sucesso para o cliente com os dados do cliente criado
      reply.send(customer);
    } catch (error) {
      // Em caso de erro durante a criação do cliente, retorna uma resposta de erro para o cliente
      reply.status(500).send({ error: "Internal Server Error" });
    }
  }
}

// Exporta a classe CreateCustomerController para que ela possa ser utilizada em outros módulos
export { CreateCustomerController };
