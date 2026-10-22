import { useState } from "react";
import formatarPreco from "../dados/formatarPreco.js";

export default function FinalizarCompra({ carrinho, total, onFinalizar }) {
  const [nome, setNome] = useState("");
  const [cidade, setCidade] = useState("");
  const [erro, setErro] = useState("");
  const [confirmacao, setConfirmacao] = useState(null);

  function enviar(evento) {
    evento.preventDefault();

    if (nome.trim() === "" || cidade.trim() === "") {
      setErro("Preencha nome e cidade.");
      setConfirmacao(null);
      return;
    }

    if (carrinho.length === 0) {
      setErro("Seu carrinho está vazio.");
      setConfirmacao(null);
      return;
    }

    setErro("");
    setConfirmacao({ nome: nome.trim(), cidade: cidade.trim(), total });
    setNome("");
    setCidade("");
    onFinalizar();
  }

  return (
    <form className="checkout-form" onSubmit={enviar}>
      <div className="checkout-form__field">
        <label htmlFor="nome">Nome</label>
        <input
          id="nome"
          type="text"
          value={nome}
          onChange={(evento) => setNome(evento.target.value)}
          required
        />
      </div>

      <div className="checkout-form__field">
        <label htmlFor="cidade">Cidade</label>
        <input
          id="cidade"
          type="text"
          value={cidade}
          onChange={(evento) => setCidade(evento.target.value)}
          required
        />
      </div>

      <button type="submit" className="checkout">
        Finalizar compra
      </button>

      {erro && (
        <p className="checkout-form__error" role="alert">
          {erro}
        </p>
      )}

      {confirmacao && (
        <p className="checkout-form__success">
          Compra simulada com sucesso! {confirmacao.nome}, de{" "}
          {confirmacao.cidade} — total de {formatarPreco(confirmacao.total)}.
        </p>
      )}
    </form>
  );
}
