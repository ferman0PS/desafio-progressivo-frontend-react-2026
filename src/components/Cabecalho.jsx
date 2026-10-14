export default function Cabecalho({ onAbrirCarrinho }) {
  return (
    <header className="header">
      <div className="container header__inner">
        <a className="brand" href="#inicio">
          <span>pagina</span> 42
        </a>
        <nav>
          <a href="#catalogo">Livros</a>
          <a href="#sobre">Sobre</a>
        </nav>
        <button
          className="cart-trigger"
          type="button"
          aria-label="Abrir carrinho"
          onClick={onAbrirCarrinho}
        >
          Carrinho
        </button>
      </div>
    </header>
  );
}
