# Desafio progressivo — Livraria Página 42 com React

Completem a Livraria Página 42 em dupla. O projeto já abre com React, JSX e CSS: vocês não precisam converter o HTML nem criar uma aplicação Vite. A cada semana, completem as tarefas indicadas e integrem antes de seguir.

## Como iniciar

testando

No terminal, dentro da pasta do projeto:

```bash
npm install
npm run dev
```

Abram o endereço exibido. A página já tem cabeçalho, apresentação, catálogo, dados carregados da API e rodapé.

## API de livros

O projeto já consulta a [API da Livraria Página 42](https://github.com/inclusiva/desafio-frontend-react-api), publicada no Render. O endpoint usado é `GET https://pagina-42-livros-api.onrender.com/api/livros`.

Esta chave é compartilhada pela turma e já está configurada em `src/dados/api.js`:

```text
FpHaY6No10dqse01yRYt2ZY-ELqp8Kw4FI4eMXAj7_E
```

Toda requisição deve enviá-la no cabeçalho `x-api-key`. A aplicação inicial já faz essa consulta; na semana 5, vocês vão completar o tratamento de carregamento, erros e resposta vazia.

## Base pronta

| Caminho                                                                    | Conteúdo fornecido                                   |
| -------------------------------------------------------------------------- | ---------------------------------------------------- |
| `index.html` e `src/main.jsx`                                              | Entrada da aplicação React                           |
| `src/App.jsx`                                                              | Estrutura principal com cabeçalho, catálogo e rodapé |
| `src/components/Cabecalho.jsx` e `Rodape.jsx`                              | JSX estático do cabeçalho e rodapé                   |
| `src/pages/Catalogo.jsx`                                                   | JSX da apresentação, catálogo e seção Sobre          |
| `src/styles/`                                                              | CSS completo da Página 42                            |
| `src/dados/api.js`                                                         | URL e chave da API                                   |
| `src/dados/formatarPreco.js`                                               | Função para mostrar preços em centavos               |
| `LivroCard.jsx`, `Carrinho.jsx`, `FinalizarCompra.jsx` e `pages/Livro.jsx` | Arquivos de atividade com `return null`              |

Usem os arquivos indicados em cada tarefa. Os dados vêm da API; o projeto não contém uma cópia local dos livros.

## Semana 1 — Componentes, props e listas

**Slides:** Introdução e fundamentos, 14 a 22.

### Pessoa 1 — Card reutilizável

**Arquivo:** `src/components/LivroCard.jsx`

1. Receba a prop `livro` e importe `formatarPreco` de `../dados/formatarPreco.js`.
2. Retorne um `article` com a classe `book-card`.
3. Dentro dele, use esta base JSX e substitua os exemplos pelas propriedades de `livro`:

```jsx
<div className={`book-cover book-cover--${livro.cor}`}>
  <h3>{livro.titulo}</h3>
  <small>{livro.autor}</small>
  <b>p.42</b>
</div>
<div className="book-card__details">
  <p>{livro.categoria}</p>
  <h3>{livro.titulo}</h3>
  <span>{livro.autor}</span>
  <div><strong>{formatarPreco(livro.preco)}</strong></div>
</div>
```

**Pronto quando:** o card usa os dados recebidos por props.

### o:** os oito livros aparecem sem aviso de `key` no console.

### Integração

Confiram títulos, autores e preços recebidos da API. Na aba Network, encontrem a requisição para `/api/livros` e confiram o status 200.
Pessoa 2 — Lista do catálogo

**Arquivo:** `src/pages/Catalogo.jsx`

1. Receba `livros` por props em `Catalogo` e importe `LivroCard` de `../components/LivroCard.jsx`.
2. Na `div.products__list`, use `livros.map`.
3. Para cada item, renderize `<LivroCard key={livro.id} livro={livro} />`.

**Pronto quand
## Semana 2 — Estado, eventos e carrinho

**Slides:** Introdução e fundamentos, 23 a 38.

### Pessoa 1 — Estado e botão de adicionar

**Arquivos:** `src/App.jsx`, `src/pages/Catalogo.jsx` e `src/components/LivroCard.jsx`

1. Em `App.jsx`, mantenham o estado `livros` e a consulta inicial à API. Acrescentem os estados `carrinho`, iniciado com `[]`, e `carrinhoAberto`, iniciado com `false`.
2. Crie `adicionarAoCarrinho(livro)`. Se o livro já estiver no carrinho, retorne um novo array aumentando sua quantidade. Caso contrário, adicione `{ ...livro, quantidade: 1 }` usando spread.
3. Passe `adicionarAoCarrinho` para `Catalogo` e depois para `LivroCard` como `onAdicionar`.
4. Em `LivroCard`, receba `onAdicionar` e adicione o botão “Adicionar ao carrinho”, com `onClick={() => onAdicionar(livro)}`.
5. Passe `carrinho`, `carrinhoAberto`, `setCarrinhoAberto` e `setCarrinho` para `Carrinho`.

### Pessoa 2 — Painel do carrinho

**Arquivo:** `src/components/Carrinho.jsx`

1. Receba por props os dados e funções passadas pelo `App`.
2. Retorne a estrutura JSX do painel com `cart-backdrop`, `aside.cart`, cabeçalho, `cart__products` e rodapé. Usem as mesmas classes que estão em `src/styles/cart.css`.
3. Aplique `cart--active` e `cart-backdrop--active` quando `carrinhoAberto` for verdadeiro.
4. Percorra `carrinho` com `map` e mostre capa, título, quantidade e o valor da linha. Use `formatarPreco(item.preco * item.quantidade)`.
5. Calcule o total com `reduce`; não crie outro estado para ele. Se o array estiver vazio, mostre “Carrinho vazio” e total zero.
6. Em cada linha, adicione “Remover”. No clique, use `filter` para retirar o item e atualize o estado pelo setter recebido.
7. O botão do cabeçalho fecha o painel. No `Cabecalho`, a dupla deve conectar o botão Carrinho à abertura por uma prop vinda do `App`.

### Integração

Adicionem “A Cidade de Papel” duas vezes e “Depois da Chuva” uma vez. O carrinho precisa mostrar duas linhas, quantidade 2 no primeiro livro e o total correto. Removam um título e confiram o novo total.

## Semana 3 — Formulários controlados e validação

**Slides:** Formulários, 2 a 13.

O carrinho criado na semana anterior é a seleção para a compra simulada. Não criem outro array de itens.

### Pessoa 1 — Formulário

**Arquivo:** `src/components/FinalizarCompra.jsx`

1. Receba `carrinho`, `total` e `onFinalizar` por props.
2. Crie os estados `nome`, `cidade`, `erro` e `confirmacao`.
3. Crie um `form` com campos controlados Nome e Cidade: cada campo deve ter `label`, `htmlFor`, `id`, `value`, `onChange` e `required`.
4. No `onSubmit`, use `preventDefault`. Se um campo tiver apenas espaços, ou o carrinho estiver vazio, preencha `erro` e encerre com `return`.
5. No envio válido, guarde nome, cidade e total em `confirmacao`, limpe os campos e chame `onFinalizar()`.
6. Mostre o erro com `role="alert"` e a confirmação com “Compra simulada com sucesso!”.

### Pessoa 2 — Conectar o formulário

**Arquivo:** `src/pages/Catalogo.jsx`

1. Importe `FinalizarCompra` em `Carrinho`.
2. Renderize-o no rodapé do painel, depois do total.
3. Passe o carrinho, o total calculado e uma função que atribua `[]` ao carrinho após o sucesso.

### Integração

Testem: carrinho vazio, campos vazios, campos com espaços e dados válidos. A página não pode recarregar; após o sucesso, o carrinho deve ser zerado e a confirmação continuar visível.

## Semana 4 — useEffect e rotas

**Slides:** Ciclo de vida e rotas, 2 a 18.

### Pessoa 1 — Rotas e links

**Arquivos:** `src/main.jsx`, `src/App.jsx` e `src/components/LivroCard.jsx`

1. Em `main.jsx`, envolvam `App` com um único `BrowserRouter`, importado de `react-router`.
2. Em `App.jsx`, configurem `Routes` e `Route`: `/` mostra `Catalogo`, `/livros/:id` mostra `Livro` e `*` mostra “Página não encontrada”.
3. Mantenham cabeçalho, carrinho e rodapé fora de `Routes`. O estado do carrinho continua no `App` e chega às duas páginas por props.
4. No card, usem `Link` para `/livros/${livro.id}`. Mantenham o botão “Adicionar ao carrinho” separado do link.

### Pessoa 2 — Detalhes do livro

**Arquivo:** `src/pages/Livro.jsx`

1. Importe `useParams` e `Link` de `react-router` e `formatarPreco`. Receba `livros` por props.
2. Leia `id` e encontre o livro correspondente.
3. Se não encontrar, mostre “Livro não encontrado” e um `Link` para `/`.
4. Se encontrar, apresente capa, título, autor, preço, descrição, páginas, editora e ano. Usem `book-detail`, `book-detail__cover` e `book-detail__content` do CSS.
5. Use `useEffect` para colocar o título do livro em `document.title`. A limpeza deve restaurar o título anterior.
6. Receba por props a função `onAdicionar` e inclua o botão para adicionar esse livro ao carrinho.

### Integração

Abram dois livros, usem Voltar e Avançar e testem `/livros/999` e `/teste`. O título da aba deve mudar nos detalhes e voltar ao anterior ao sair.

## Semana 5 — Fetch, HTTP e assincronismo

**Slides:** Fetch API, HTTP e assincronismo, 2 a 19.

O catálogo já carrega dados do endpoint `https://pagina-42-livros-api.onrender.com/api/livros`. A chave usada pela turma é `FpHaY6No10dqse01yRYt2ZY-ELqp8Kw4FI4eMXAj7_E` e está em `src/dados/api.js`.

### Pessoa 1 — Consultar a API

**Arquivos:** `src/App.jsx` e `src/pages/Catalogo.jsx`

1. No efeito de `App.jsx`, mantenham o estado `livros` e acrescentem `carregando`, iniciado com `true`, e `erro`, iniciado com `""`. Mantenham também o estado do carrinho.
2. Reorganizem o efeito: declare `let ignorar = false` e uma função `async carregar()` dentro dele.
3. No topo de `App.jsx`, junto aos imports, importem as constantes já fornecidas:

```jsx
import { API_KEY, API_URL } from "./dados/api.js";
```

Dentro da função `carregar`, façam a requisição e confiram `resposta.ok`. Leiam o JSON com `await` e atualizem o estado somente quando `!ignorar`:

```js
const resposta = await fetch(API_URL, {
  headers: { "x-api-key": API_KEY },
});
```

4. Usem `try`, `catch` e `finally`. A limpeza do efeito deve definir `ignorar = true`.
5. Passem os livros, o carregamento e o erro para `Catalogo` e para a página `Livro`.

### Pessoa 2 — Estados da interface e detalhes

**Arquivos:** `src/pages/Catalogo.jsx` e `src/pages/Livro.jsx`

1. Mostre “Carregando...”, uma mensagem com `role="alert"` para erro e “Nenhum livro encontrado” para array vazio.
2. Renderize os cards somente depois de existirem livros.
3. Em `Livro`, espere o carregamento terminar antes de declarar um ID inexistente. Use os livros recebidos por props.
4. A página de detalhes também deve mostrar carregamento e erro.

### Integração e entrega

- [ ] Aguardar a lista carregada pela API.
- [ ] Adicionar dois livros ao carrinho, incluindo duas unidades de um deles.
- [ ] Abrir um detalhe, voltar e usar Avançar.
- [ ] Testar página e livro inexistentes.
- [ ] Testar formulário vazio, com espaços e válido.
- [ ] Conferir a confirmação e o carrinho vazio.
- [ ] Na aba Network, conferir GET, status 200 e o cabeçalho `x-api-key`.

Cada pessoa explica uma função que implementou e como ela altera o estado e a tela. Atualizem o fork e abram o Pull Request com os nomes da dupla.
