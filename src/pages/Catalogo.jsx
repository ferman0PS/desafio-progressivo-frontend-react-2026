import LivroCard from "../components/LivroCard.jsx";

export default function Catalogo( {livros} ) {
  return (
    <main id="inicio">
      <section className="hero">
        <div className="container hero__inner">
          <div>
            <p className="eyebrow">livros para todos os momentos</p>
            <h1>
              Encontre uma
              <br />
              nova <em>historia.</em>
            </h1>
            <p>
              Uma seleção de livros para ler, presentear e guardar na estante.
            </p>
            <a href="#catalogo" className="button button--dark">
              Ver livros
            </a>
          </div>
          <div className="hero__books" aria-hidden="true">
            <div className="cover cover--yellow">
              <span>O pequeno</span>
              <strong>UNIVERSO</strong>
            </div>
            <div className="cover cover--coral">
              <span>A cidade</span>
              <strong>DE PAPEL</strong>
            </div>
            <div className="cover cover--blue">
              <span>Depois</span>
              <strong>DA CHUVA</strong>
            </div>
          </div>
        </div>
      </section>
      <section className="catalog container" id="catalogo">
        <div className="section-heading">
          <div>
            <p className="eyebrow">catalogo</p>
            <h2>Escolha sua próxima leitura</h2>
          </div>
        </div>
        <div className="products__list">
           {livros.map((livro) => (
    <LivroCard key={livro.id} livro={livro} />
  ))}
        </div>
      </section>
      <section className="about" id="sobre">
        <div className="container">
          <p className="eyebrow">pagina 42</p>
          <h2>
            Uma livraria simples,
            <br />
            feita para boas leituras.
          </h2>
        </div>
      </section>
    </main>
  );
}
