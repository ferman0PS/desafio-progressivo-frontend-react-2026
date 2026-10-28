import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router";
import Cabecalho from "./components/Cabecalho.jsx";
import Carrinho from "./components/Carrinho.jsx";
import Rodape from "./components/Rodape.jsx";
import Catalogo from "./pages/Catalogo.jsx";
import Livro from "./pages/Livro.jsx";
import { API_KEY, API_URL } from "./dados/api.js";

export default function App() {
  const [livros, setLivros] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [carrinho, setCarrinho] = useState([]);
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);

  useEffect(() => {
    let ignorar = false;

    async function carregar() {
      try {
        const resposta = await fetch(API_URL, {
          headers: { "x-api-key": API_KEY },
        });

        if (!resposta.ok) {
          throw new Error(`Erro ${resposta.status} ao buscar os livros.`);
        }

        const dados = await resposta.json();

        if (!ignorar) {
          setLivros(dados);
          setErro("");
        }
      } catch {
        if (!ignorar) {
          setErro("Não foi possível carregar os livros. Tente novamente.");
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
              carregando={carregando}
              erro={erro}
              onAdicionar={adicionarAoCarrinho}
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
            <main className="container book-not-found">
              <h1>Página não encontrada</h1>
              <Link className="button button--dark" to="/">
                Voltar ao catálogo
              </Link>
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

