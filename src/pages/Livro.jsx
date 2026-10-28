import { useEffect } from "react";
import { Link, useParams } from "react-router";
import formatarPreco from "../dados/formatarPreco.js";

export default function Livro({ livros, carregando, erro, onAdicionar }) {
  const { id } = useParams();
  const livro = livros.find((item) => String(item.id) === id);
  const titulo = livro ? livro.titulo : "";

  useEffect(() => {
    if (!titulo) return;

    const tituloAnterior = document.title;
    document.title = titulo;

    return () => {
      document.title = tituloAnterior;
    };
  }, [titulo]);

  if (carregando) {
    return (
      <main className="product-page">
        <div className="container">
          <p role="status">Carregando...</p>
        </div>
      </main>
    );
  }

  if (erro) {
    return (
      <main className="product-page">
        <div className="container">
          <p role="alert">{erro}</p>
        </div>
      </main>
    );
  }

  if (!livro) {
    return (
      <main className="product-page">
        <div className="container">
          <div className="book-not-found">
            <h1>Livro não encontrado</h1>
            <Link className="button button--dark" to="/">
              Voltar ao catálogo
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="product-page">
      <div className="container">
        <Link className="back-link" to="/">
          Voltar
        </Link>

        <article className="book-detail">
          <div
            className={`book-cover book-cover--${livro.cor} book-detail__cover`}
            aria-hidden="true"
          >
            <span>{livro.categoria}</span>
            <h3>{livro.titulo}</h3>
            <small>{livro.autor}</small>
            <b>p.42</b>
          </div>

          <div className="book-detail__content">
            <p className="eyebrow">{livro.categoria}</p>
            <h1>{livro.titulo}</h1>
            <p className="book-detail__author">{livro.autor}</p>
            <strong className="book-detail__price">
              {formatarPreco(livro.preco)}
            </strong>

            <div className="book-detail__buy">
              <button
                type="button"
                className="book-detail__add"
                onClick={() => onAdicionar(livro)}
              >
                Adicionar ao carrinho
              </button>
            </div>

            <p className="book-detail__description">{livro.descricao}</p>

            <dl className="book-detail__meta">
              <div>
                <dt>Páginas</dt>
                <dd>{livro.paginas}</dd>
              </div>
              <div>
                <dt>Editora</dt>
                <dd>{livro.editora}</dd>
              </div>
              <div>
                <dt>Ano</dt>
                <dd>{livro.ano}</dd>
              </div>
            </dl>
          </div>
        </article>
      </div>
    </main>
  );
}
