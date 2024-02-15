import React, { useEffect, useState } from 'react';
import styles from '../styles/LivroLista.module.css';
import { Menu } from '../componentes/Menu';

interface Livro {
  codigo: number;
  titulo: string;
  resumo: string;
  codEditora: number;
  autores: string[];
}

interface Editora {
  codEditora: number;
  nome: string;
}

const baseURL = "http://localhost:3000/api";

const obterLivros = async (): Promise<Livro[]> => {
  const response = await fetch(`${baseURL}/livros`);
  return response.json();
};

const obterEditoras = async (): Promise<Editora[]> => {
  const response = await fetch(`${baseURL}/editoras`);
  return response.json();
};

const excluirLivro = async (codigo: number): Promise<boolean> => {
  const response = await fetch(`${baseURL}/livros/${codigo}`, {
    method: 'DELETE',
  });
  return response.ok;
};

const LivroLista: React.FC = () => {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [editoras, setEditoras] = useState<{ [key: number]: string }>({});
  const [carregado, setCarregado] = useState(false);

  const excluir = (codigo: number) => {
    excluirLivro(codigo)
      .then(() => setCarregado(false));
  };

  useEffect(() => {
    if (!carregado) {
      Promise.all([obterLivros(), obterEditoras()])
        .then(([livros, editoras]) => {
          setLivros(livros);
          const editoraMap = editoras.reduce((map, editora) => {
            map[editora.codEditora] = editora.nome;
            return map;
          }, {} as { [key: number]: string });
          setEditoras(editoraMap);
          setCarregado(true);
        });
    }
  }, [carregado]);

  return (
    <div className={styles.container}>
      <Menu />
      <main className={styles.main}>
        <h1 className={styles.titulo}>Catálogo de Livros</h1>
        <table className={styles.table}>
          <thead>
            <tr className={styles.tableHeader}>
              <th className={styles.tableCell}>Título</th>
              <th className={styles.tableCell}>Resumo</th>
              <th className={styles.tableCell}>Editora</th>
              <th className={styles.tableCell}>Autores</th>
            </tr>
          </thead>
          <tbody>
            {livros.map((livro, index) => (
              <tr key={livro.codigo} className={index % 2 === 0 ? styles.destaqueCinza : styles.destaqueBranco}>
                <td className={styles.tituloCell}>
                  <div className={styles.tituloWrapper}>
                    <h3 className={styles.tituloLivro}>{livro.titulo}</h3>
                    <button onClick={() => excluir(livro.codigo)} className={styles.excluirButton}>Excluir</button>
                  </div>
                </td>
                <td className={styles.tableCell}>{livro.resumo}</td>
                <td className={styles.tableCell}>{editoras[livro.codEditora]}</td>
                <td className={styles.tableCell}>{livro.autores.join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default LivroLista;
