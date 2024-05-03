import { FastifyRequest, FastifyReply } from "fastify";
import { ListCustomerService } from "../services/ListCustomerService";

class ListCustomersControllers {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const listCustomerService = new ListCustomerService();
    const customer = await listCustomerService.execute();
    reply.send(customer);
  }
}
export { ListCustomersControllers };
