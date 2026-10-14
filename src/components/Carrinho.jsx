export default function Carrinho() {
  // A dupla completa este componente a partir da semana 2.
  }

  
import { formatarPreco } from "../dados/formatarPreco.js";

export default function Carrinho({
  carrinho,
  carrinhoAberto,
  setCarrinhoAberto,
  setCarrinho,
}) {
  const total = carrinho.reduce((soma, item) => {
    return soma + item.preco * item.quantidade;
  }, 0);

  function removerLivro(id) {
    const novoCarrinho = carrinho.filter((item) => item.id !== id);
    setCarrinho(novoCarrinho);
  }

  function fecharCarrinho() {
    setCarrinhoAberto(false);
  }

  return (
    <>
      <div
        className={`cart-backdrop ${
          carrinhoAberto ? "cart-backdrop--active" : ""
        }`}
        onClick={fecharCarrinho}
        aria-hidden={!carrinhoAberto}
      />

      <aside
        className={`cart ${carrinhoAberto ? "cart--active" : ""}`}
        aria-hidden={!carrinhoAberto}
      >
        <header className="cart__header">
          <h2>Seu carrinho</h2>

          <button
            type="button"
            className="cart__close"
            onClick={fecharCarrinho}
            aria-label="Fechar carrinho"
          >
            &times;
          </button>
        </header>

        <div className="cart__products">
          {carrinho.length === 0 ? (
            <p>Carrinho vazio</p>
          ) : (
            carrinho.map((item) => (
              <article className="cart__product" key={item.id}>
                <div
                  className={`cart-mini-cover book-cover--${item.cor}`}
                  aria-hidden="true"
                >
                  <b>p.42</b>
                </div>

                <div className="cart__product-info">
                  <h3>{item.titulo}</h3>

                  <p>Quantidade: {item.quantidade}</p>

                  <strong>
                    {formatarPreco(item.preco * item.quantidade)}
                  </strong>

                  <button
                    type="button"
                    className="cart__remove"
                    onClick={() => removerLivro(item.id)}
                  >
                    Remover
                  </button>
                </div>
              </article>
            ))
          )}
        </div>

        <footer className="cart__footer">
          <div className="cart__total">
            <span>Total</span>
            <strong>{formatarPreco(total)}</strong>
          </div>
        </footer>
      </aside>
    </>
  );
}
