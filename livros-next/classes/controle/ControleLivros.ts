import { Livro } from "../modelo/Livro";

let livros: Array<Livro> = [
  {
    codigo: 1,
    codEditora: 1,
    titulo: "Harry Potter e a Pedra Filosofal",
    resumo: " Primeiro livro da série narra as aventuras de Harry Potter, um menino órfão que descobre que é um bruxo e que frequentará uma escola de magia.",
    autores: ["J.K. Rowling"],
  },
  {
    codigo: 2,
    codEditora: 2,
    titulo: "O Pequeno Príncipe",
    resumo: "O Pequeno Príncipe narra a história de um menino que deixa seu pequeno planeta em busca de aventuras e encontra diversas criaturas pelo caminho, incluindo um piloto perdido no deserto do Saara.",
    autores: ["Antoine de Saint-Exupéry."],
  },
  {
    codigo: 3,
    codEditora: 3,
    titulo: "A Revolução dos Bichos ",
    resumo: "O livro narra a história da fazenda dos bichos, que se rebelam contra seus donos humanos e assumem o controle, mas a liderança dos porcos transforma a fazenda em uma tirania.",
    autores: ["George Orwell"],
  },
];

class ControleLivros {
  obterLivros(): Array<Livro> {
    return livros;
  }

  incluir(livro: Livro): void {
    const novoCodigo = livros.length + 1;
    const novoLivro = { ...livro, codigo: novoCodigo };
    livros.push(novoLivro);
  }

  excluir(codigo: number): void {
    const indiceLivro = livros.findIndex((livro) => livro.codigo === codigo);
    if (indiceLivro >= 0) {
      livros.splice(indiceLivro, 1);
    }
  }
}

export { ControleLivros };
