

import { useEffect, useState } from "react";
import { Routes, Route } from "react-router";
import Cabecalho from "./components/Cabecalho.jsx";
import Carrinho from "./components/Carrinho.jsx";
import Rodape from "./components/Rodape.jsx";
import Catalogo from "./pages/Catalogo.jsx";
import Livro from "./pages/Livro.jsx";
import { API_KEY, API_URL } from "./dados/api.js";

export default function App() {
  const [livros, setLivros] = useState([]);
  const [carrinho, setCarrinho] = useState([]);
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    let ignorar = false;

    async function carregar() {
      try {
        setCarregando(true);
        setErro("");

        const resposta = await fetch(API_URL, {
          headers: { "x-api-key": API_KEY },
        });

        if (!resposta.ok) {
          throw new Error("Não foi possível carregar os livros.");
        }

        const dados = await resposta.json();

        if (!ignorar) {
          setLivros(dados);
        }
      } catch (error) {
        if (!ignorar) {
          setErro(error.message || "Ocorreu um erro ao carregar os livros.");
        }
      } finally {
        if (!ignorar) {
          setCarregando(false);
        }
      }
    }

    carregar();

    return () => {
      ignorar = true;
    };
  }, []);

  function adicionarAoCarrinho(livro) {
    setCarrinho((carrinhoAtual) => {
      const jaEstaNoCarrinho = carrinhoAtual.some(
        (item) => item.id === livro.id,
      );

      if (jaEstaNoCarrinho) {
        return carrinhoAtual.map((item) =>
          item.id === livro.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item,
        );
      }

      return [...carrinhoAtual, { ...livro, quantidade: 1 }];
    });
  }

  return (
    <>
      <Cabecalho onAbrirCarrinho={() => setCarrinhoAberto(true)} />

      <Routes>
        <Route
          path="/"
          element={
            <Catalogo
              livros={livros}
              onAdicionar={adicionarAoCarrinho}
              carregando={carregando}
              erro={erro}
            />
          }
        />

        <Route
          path="/livros/:id"
          element={
            <Livro
              livros={livros}
              carregando={carregando}
              erro={erro}
              onAdicionar={adicionarAoCarrinho}
            />
          }
        />

        <Route
          path="*"
          element={
            <main className="container">
              <h1>Página não encontrada</h1>
              <a href="/">Voltar para o catálogo</a>
            </main>
          }
        />
      </Routes>

      <Rodape />

      <Carrinho
        carrinho={carrinho}
        carrinhoAberto={carrinhoAberto}
        setCarrinhoAberto={setCarrinhoAberto}
        setCarrinho={setCarrinho}
      />
    </>
  );
}
