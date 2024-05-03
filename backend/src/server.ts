// Importa o módulo Fastify do pacote 'fastify'
import Fastify from "fastify";

// Importa o plugin de CORS do pacote '@fastify/cors'
import cors from "@fastify/cors";

// Importa a função de rotas do arquivo './routes'
import { routes } from "./routes";

// Cria uma instância do Fastify com a configuração de logger ativada
const app = Fastify({ logger: true });

// Define um manipulador de erro global para o aplicativo Fastify
app.setErrorHandler((error, request, reply) => {
  // Define a resposta com um código de status 400 e uma mensagem de erro
  reply.code(400).send({ message: error.message });
});

// Função async que inicia o servidor Fastify
const start = async () => {
  try {
    // Registra o plugin de CORS no servidor Fastify
    await app.register(cors);

    // Registra as rotas no servidor Fastify
    await app.register(routes);

    // Inicia o servidor Fastify na porta 3333
    await app.listen({ port: 3333 });
    console.log("Servidor rodando na porta 3333");
  } catch (err) {
    // Em caso de erro ao iniciar o servidor, encerra o processo com código de saída 1
    console.error("Erro ao iniciar o servidor:", err);
    process.exit(1);
  }
};

// Chama a função start para iniciar o servidor Fastify
start();
