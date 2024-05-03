import { useEffect, useState, useRef, FormEvent } from "react";
import { FiTrash } from "react-icons/fi";
import api from "./services/api";

interface Customer {
  id: string;
  name: string;
  email: string;
  status: boolean;
  created_at: string;
}

export default function App() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCustomers();
  }, []);

  async function loadCustomers() {
    try {
      const response = await api.get("/customers");
      setCustomers(response.data);
    } catch (error) {
      console.error("Error loading customers:", error);
    }
  }

  async function handleSubmit(event: FormEvent): Promise<void> {
    event.preventDefault();
    if (!nameRef.current?.value || !emailRef.current?.value) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    try {
      const response = await api.post("/customer", {
        name: nameRef.current?.value,
        email: emailRef.current?.value,
      });
      setCustomers((prevCustomers) => [...prevCustomers, response.data]);
      nameRef.current.value = "";
      emailRef.current.value = "";
      setError(null);
    } catch (error) {
      setError("Erro ao cadastrar cliente. Tente novamente mais tarde.");
      console.error("Error creating customer:", error);
    }
  }

  async function handleDelete(id: string): Promise<void> {
    try {
      await api.delete("customer", {
        params: {
          id: id,
        },
      });
      const updatedCustomers = customers.filter(
        (customer) => customer.id !== id
      );
      setCustomers(updatedCustomers);
    } catch (error) {
      setError("Erro ao excluir cliente. Tente novamente mais tarde.");
      console.error("Error deleting customer:", error);
    }
  }

  return (
    <div className="bg-gray-950 min-h-screen flex justify-center">
      <div className="w-full max-w-2xl">
        <main className="my-10">
          <h1 className="text-4xl font-medium text-white">Clientes</h1>
        </main>
        <form className="flex flex-col my-6" onSubmit={handleSubmit}>
          <label htmlFor="nome" className="font-medium text-white">
            Nome:
          </label>
          <input
            id="nome"
            type="text"
            placeholder="Digite seu nome completo..."
            className="w-full mb-5 p-2 rounded"
            ref={nameRef}
          />
          <label htmlFor="email" className="font-medium text-white">
            Email:
          </label>
          <input
            id="email"
            type="email"
            placeholder="Digite seu email..."
            className="w-full mb-5 p-2 rounded"
            ref={emailRef}
          />

          <input
            type="submit"
            value="Cadastrar"
            className="w-full p-2 bg-green-600 rounded font-medium text-white"
          />
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>

        <section className="flex flex-col gap-4">
          {" "}
          {/* Adicionado gap-4 para espaçamento vertical */}
          {customers.map((customer) => (
            <article
              key={customer.id}
              className="w-full bg-white rounded p-2 relative hover:scale-104 duration-200"
            >
              <p>
                <span className="font-medium">Nome:</span> {customer.name}
              </p>
              <p>
                <span className="font-medium">Email:</span> {customer.email}
              </p>
              <p>
                <span className="font-medium">Status:</span>{" "}
                {customer.status ? "Ativo" : "Inativo"}
              </p>
              <button
                className="bg-red-500 w-7 h-7 flex items-center justify-center rounded-lg absolute right-0 top-2"
                onClick={() => handleDelete(customer.id)}
              >
                <FiTrash size={24} color="#FFF" />
              </button>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}
