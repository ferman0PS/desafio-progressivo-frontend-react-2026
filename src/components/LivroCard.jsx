import { Link } from "react-router";
import formatarPreco from "../dados/formatarPreco.js";

export default function LivroCard({ livro, onAdicionar }) {
  return (
    <article className="book-card">
      <div className={`book-cover book-cover--${livro.cor}`}>
        <h3>{livro.titulo}</h3>
        <small>{livro.autor}</small>
        <b>p.42</b>
      </div>
      <div className="book-card__details">
        <p>{livro.categoria}</p>
        <h3>{livro.titulo}</h3>
        <span>{livro.autor}</span>
        <div>
          <strong>{formatarPreco(livro.preco)}</strong>
          <Link to={`/livros/${livro.id}`}>Ver detalhes</Link>
        </div>
        <button type="button" onClick={() => onAdicionar(livro)}>
          Adicionar ao carrinho
        </button>
      </div>
    </article>
  );
}

