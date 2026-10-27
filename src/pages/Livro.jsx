

import { useEffect } from "react";
import { useParams, Link } from "react-router";
import formatarPreco from "../dados/formatarPreco.js";

export default function Livro({
  livros,
  carregando,
  erro,
  onAdicionar,
}) {
  const { id } = useParams();

  const livro = livros.find((item) => String(item.id) === id);

  useEffect(() => {
    if (!livro) {
      return;
    }

    const tituloAnterior = document.title;
    document.title = livro.titulo;

    return () => {
      document.title = tituloAnterior;
    };
  }, [livro]);

  if (carregando) {
    return (
      <main className="container">
        <p>Carregando...</p>
      </main>
    );
  }

  if (erro) {
    return (
      <main className="container">
        <p role="alert">{erro}</p>
        <Link to="/">Voltar para o catálogo</Link>
      </main>
    );
  }

  if (!livro) {
    return (
      <main className="container">
        <h1>Livro não encontrado</h1>
        <Link to="/">Voltar para o catálogo</Link>
      </main>
    );
  }

  return (
    <main className="container">
      <Link to="/">← Voltar para o catálogo</Link>

      <article className="book-detail">
        <div
          className={`book-detail__cover book-cover--${livro.cor}`}
        >
          <h2>{livro.titulo}</h2>
          <small>{livro.autor}</small>
          <b>p.42</b>
        </div>

        <div className="book-detail__content">
          <p>{livro.categoria}</p>
          <h1>{livro.titulo}</h1>
          <p>Autor: {livro.autor}</p>

          <h2>{formatarPreco(livro.preco)}</h2>

          <p>{livro.descricao || "Descrição não informada."}</p>

          <p>
            <strong>Páginas:</strong>{" "}
            {livro.paginas ?? "Não informado"}
          </p>

          <p>
            <strong>Editora:</strong>{" "}
            {livro.editora || "Não informada"}
          </p>

          <p>
            <strong>Ano:</strong>{" "}
            {livro.ano ?? "Não informado"}
          </p>

          <button type="button" onClick={() => onAdicionar(livro)}>
            Adicionar ao carrinho
          </button>
        </div>
      </article>
    </main>
  );
}
