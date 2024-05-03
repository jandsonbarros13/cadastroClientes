// Importando os tipos necessários do Fastify
import {
  FastifyInstance, // Instância do Fastify
  FastifyPluginOptions, // Opções do plugin Fastify
  FastifyRequest, // Requisição do Fastify
  FastifyReply, // Resposta do Fastify
} from "fastify";

// Importando os controladores necessários
import { CreateCustomerController } from "./controllers/createCustomerControllers";
import { DeleteCustomerControlers } from "./controllers/DeleteCustomerControlers";
import { ListCustomersControllers } from "./controllers/ListCustomersControllers";

// Definindo a função de rotas que será exportada
export async function routes(
  fastify: FastifyInstance, // Instância do Fastify passada como parâmetro
  options: FastifyPluginOptions // Opções do plugin passadas como parâmetro
) {
  // Definindo uma rota GET no Fastify para o caminho "/teste"
  fastify.get(
    "/teste", // Caminho da rota
    async (request: FastifyRequest, reply: FastifyReply) => {
      // Função de callback assíncrona para lidar com a requisição GET
      return { ok: true }; // Retorna um objeto { ok: true } como resposta
    }
  );

  // Definindo uma rota POST no Fastify para o caminho "/customer"
  fastify.post(
    "/customer",
    async (request: FastifyRequest, reply: FastifyReply) => {
      // Ao receber uma requisição POST em /customer, instancia o CreateCustomerController e chama o método handle
      return new CreateCustomerController().handle(request, reply);
    }
  );

  // Definindo uma rota GET no Fastify para o caminho "/customers"
  fastify.get(
    "/customers",
    async (request: FastifyRequest, reply: FastifyReply) => {
      // Ao receber uma requisição GET em /customers, instancia o ListCustomersControllers e chama o método handle
      return new ListCustomersControllers().handle(request, reply);
    }
  );

  // Definindo uma rota DELETE no Fastify para o caminho "/customer"
  fastify.delete(
    "/customer",
    async (request: FastifyRequest, reply: FastifyReply) => {
      // Ao receber uma requisição DELETE em /customer, instancia o DeleteCustomerControlers e chama o método handle
      return new DeleteCustomerControlers().handle(request, reply);
    }
  );
}
